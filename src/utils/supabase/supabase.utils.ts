import { createClient } from "@supabase/supabase-js";

type SupaBaseProps = {
  supabaseURL: string;
  supabaseAnonKey: string;
};

const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or Supabase Anon Key");
}

export const supabase = createClient(
  supabaseURL as string,
  supabaseAnonKey as string
);

/* expample usage'

FC start:
      const [countries, setCountries] = useState<{ name: string }[]>([]);

      useEffect(() => {
        getCountries();
      }, []);

      async function getCountries() {
        const { data } = await supabase.from("countries").select();
        setCountries(data as any);
      }
 
 
 return (
       <ul>
        {countries.map((country) => (
          <li key={country.name as any}>{country.name}</li>
        ))}
      </ul>

      */