create table profiles (
    id uuid references auth.users on delete cascade not null primary key,
    username varchar(32) unique not null,
    name varchar(50),
    bio varchar(150),
    profile_picture varchar(150),
    website varchar(150),
    country char(2),
    public boolean default false,
    created_at timestamptz default now(),

    constraint username_length check (char_length(username) >= 4)
);

alter table profiles 
    enable row level security;

create policy "Public profiles are viewable by everyone" on profiles 
    for select using (true);

create policy "Users can insert their own profile" on profiles
    for insert with check (auth.uid() = id);

create policy "Users can update their own profile" on profiles
    for update using (auth.uid() = id);