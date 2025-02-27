-- Create friends table
create table friends (
    user_id uuid references auth.users(id) on delete cascade,
    friend_id uuid references auth.users(id) on delete cascade,
    requester_id uuid references auth.users(id),  -- Tracks who sent the friend request
    status text check (status IN ('pending', 'accepted', 'blocked')) not null,
    updated_at timestamp default now(),  -- Tracks the most recent status change
    primary key (user_id, friend_id)
);

-- Enable Row Level Security (RLS)
alter table friends enable row level security;

-- Policy: Users can view their own friend relationships (pending, accepted, or blocked)
create policy "Users can view their own friend relationships"
on friends
for select
using (
    auth.uid() = user_id OR auth.uid() = friend_id
);

-- Policy: Users can insert a new friend request (only if user_id is the requester)
create policy "Users can insert a new friend request"
on friends
for insert
with check (
    auth.uid() = requester_id AND
    NOT EXISTS (SELECT 1 FROM friends WHERE (user_id = requester_id AND friend_id = friend_id) OR (user_id = friend_id AND friend_id = requester_id))
);

-- Policy: Users can update the status of a friend request (e.g., accept or block) if they are either user_id or friend_id
create policy "Users can update their own friend request status"
on friends
for update
using (
    auth.uid() = user_id OR auth.uid() = friend_id
);

-- Policy: Users cannot delete any friend relationships
create policy "Users cannot delete any friend relationships"
on friends
for delete
using (false);
