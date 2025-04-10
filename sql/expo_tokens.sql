create table expo_tokens (
  user_id uuid references auth.users on delete cascade not null,
  token text not null,
  updated_at timestamp with time zone default now()
);

alter table expo_tokens enable row level security;

create policy "Users can view their own tokens" on expo_tokens
    for select using (auth.uid() = user_id);

create policy "Users can insert a new token" on expo_tokens
    for insert with check (auth.uid() = user_id);

create policy "Users can update their own token" on expo_tokens
    for update using (auth.uid() = user_id);

create policy "Users can delete their own token" on expo_tokens
    for delete using (auth.uid() = user_id);

alter table expo_tokens
add constraint fk_user_id_expo_tokens
foreign key (user_id) references profiles(id) on delete cascade;