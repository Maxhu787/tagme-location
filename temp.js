const { data, error } = await supabase
  .from("profiles")
  .select(
    `
    id,
    username,
    case when public then bio else null end as bio,
    case when public then profile_picture else null end as profile_picture,
    case when public then website else null end as website
  `
  )
  .eq("id", userId) // Query for the specific user profile
  .single(); // Fetch one result (for the current logged-in user)

if (error) {
  console.error("Error fetching profile:", error);
} else {
  console.log(data);
}
