import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const supabase: SupabaseClient = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL as string,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const checkIfUserExists = async (email: string) => {
	const { data } = await supabase
		.from("users")
		.select("email")
		.eq("email", email);
	return !!data?.length;
};

export const createUser = async (
	email: string,
	password: string,
	data: object
) => {
	const { user, session, error } = await supabase.auth.signUp(
		{
			email: email,
			password: password,
		},
		{
			data: data,
		}
	);
	console.log("supa", user, session, error);
	return true;
};
