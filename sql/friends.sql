create table friends (
    user_id uuid references auth.users on delete cascade not null,
    friend_id uuid references auth.users on delete cascade not null,
    status text check (status IN ('pending', 'accepted', 'blocked')) not null,
    updated_at timestamptz default now(),
    primary key (user_id, friend_id)
);

alter table friends enable row level security;

create policy "Users can view their own friend relationships" on friends
    for select using (
    auth.uid() = user_id OR auth.uid() = friend_id
);

create policy "Users can insert a new friend request" on friends
    for insert with check (auth.uid() = user_id);

create policy "Users can update their own friend request status" on friends
    for update using (auth.uid() = user_id OR auth.uid() = friend_id);

create policy "Users can delete friend relationships" on friends
    for delete using (auth.uid() = user_id OR auth.uid() = friend_id);

alter table friends
add constraint fk_user_id_profiles
foreign key (user_id) references profiles(id) on delete cascade;

alter table friends
add constraint fk_friend_id_profiles
foreign key (friend_id) references profiles(id) on delete cascade;