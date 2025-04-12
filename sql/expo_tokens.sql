create table expo_tokens (
    id uuid references auth.users on delete cascade not null primary key,
    token text not null,
    timestamp timestamptz default now()
);

alter table expo_tokens 
    enable row level security;

create policy "Users can view their own tokens" on expo_tokens
    for select using (auth.uid() = id);

create policy "Users can insert a new token" on expo_tokens
    for insert with check (auth.uid() = id);

create policy "Users can update their own token" on expo_tokens
    for update using (auth.uid() = id);

create policy "Users can delete their own token" on expo_tokens
    for delete using (auth.uid() = id);

-- alter table expo_tokens
-- add constraint fk_id_expo_tokens
-- foreign key (id) references profiles(id) on delete cascade;