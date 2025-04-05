create table user_location (
    id uuid references auth.users on delete cascade not null primary key,
    latitude varchar(20) not null,
    longitude varchar(20) not null,
    battery int not null check (battery between 0 and 100),
    timestamp timestamptz default now()
);

alter table user_location 
    enable row level security;

create policy "Users can view their own or friends' locations" on user_location 
    for select using (
        auth.uid() = id OR
        id IN (SELECT friend_id FROM friends WHERE user_id = auth.uid()) OR 
        id IN (SELECT user_id FROM friends WHERE friend_id = auth.uid())
    );


create policy "Users can insert their own location" on user_location
    for insert with check (auth.uid() = id);

create policy "Users can update their own location" on user_location
    for update using (auth.uid() = id);

create policy "Users cannot delete any location data" on user_location
    for delete using (false);
