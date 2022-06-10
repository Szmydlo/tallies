import {
	AuthSession,
	SupabaseClient,
	createClient,
} from "@supabase/supabase-js";

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
	const { error } = await supabase.auth.signUp(
		{
			email: email,
			password: password,
		},
		{
			data: data,
		}
	);
	if (!error) {
		return true;
	}
	throw error;
};

const isExpired = (expiryDate: number): boolean => {
	return expiryDate > +new Date();
};

export const getSessionOrNull = (): AuthSession | null => {
	const session: AuthSession | null = supabase.auth.session();

	// check if session exists
	if (session) {
		// and is not expired
		if (!isExpired(session.expires_at as number)) return session;
	}
	return null;
};

export const isLoggedIn = (): boolean => {
	const session: AuthSession | null = supabase.auth.session();

	// check if session exists
	if (session) {
		// and is not expired
		if (!isExpired(session.expires_at as number)) return true;
	}
	return false;
};

export const clearSession = (): void => {
	localStorage.clear();
};
