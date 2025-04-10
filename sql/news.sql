create table news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  created_at timestamp with time zone default now()
);

alter table news enable row level security;

create policy "Allow service role only" on news
  for all using (auth.role() = 'service_role');


create or replace function notify_new_news()
returns trigger as $$
begin
  set search_path to public;
  
  perform net.http_post(
    url := 'https://xjbhxzyobmycwtoephwa.functions.supabase.co/send-push-notifications',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object('data', jsonb_build_object('record', row_to_json(NEW)))
  );
  return NEW;
end;
$$ language plpgsql;

create trigger trigger_notify_new_news
after insert on news
for each row
execute function notify_new_news();
