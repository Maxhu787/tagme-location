-- Create profiles table
create table profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    username varchar(32) unique not null,
    bio varchar(150),
    profile_picture varchar(150),
    website varchar(150),
    country char(2),
    public boolean default false,
    created_at timestamp default now()
);

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;

-- Policy: Public profiles are fully visible to everyone
create policy "Public profiles are visible to everyone"
on profiles
for select
using (public = true);

-- Policy: Users can see usernames of private profiles
create policy "Users can see usernames of private profiles"
on profiles
for select
using (true);

-- Policy: Users can update their own profile
create policy "Users can update their own profile"
on profiles
for update
using (auth.uid() = id);

-- Policy: Users can insert their profile only if it doesn't exist
create policy "Users can insert their profile only if it doesn't exist"
on profiles
for insert
with check (
    auth.uid() = id 
    AND NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid())
);
