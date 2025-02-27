-- Create user_location table
create table user_location (
    id uuid primary key references auth.users(id) on delete cascade,
    latitude varchar(20) not null,
    longitude varchar(20) not null,
    battery int not null check (battery between 0 and 100),
    timestamp timestamp default now()
);

-- Enable Row Level Security (RLS)
alter table user_location enable row level security;

-- Policy: Users can insert their location only if they don’t already have a row
create policy "Users can insert their location only if they don't have one"
on user_location
for insert
with check (
    auth.uid() = id 
    AND NOT EXISTS (SELECT 1 FROM user_location WHERE id = auth.uid())
);

-- Policy: Users can update only their own location
create policy "Users can update their own location"
on user_location
for update
using (auth.uid() = id);

-- Policy: Users can view their own or their friends' locations
create policy "Users can view their own or their friends' locations"
on user_location
for select
using (
    auth.uid() = id OR
    auth.uid() IN (SELECT friend_id FROM friends WHERE user_id = user_location.id) OR 
    auth.uid() IN (SELECT user_id FROM friends WHERE friend_id = user_location.id)
);

-- Policy: Users cannot delete any location data
create policy "Users cannot delete any location data"
on user_location
for delete
using (false);
