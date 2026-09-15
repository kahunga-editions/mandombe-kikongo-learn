import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ValidatedForm {
  lari: string;
  mandombe: string;
  gloss: string;
  lang: string;
  notes?: string;
  createdAt?: string;
}

/**
 * Formes validées par l'expert dans le traducteur, filtrées côté serveur
 * pour ne garder que celles qui relèvent de la conjugaison.
 */
export function useValidatedForms() {
  return useQuery<ValidatedForm[]>({
    queryKey: ["validated-forms"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("validated-forms", { body: {} });
      if (error) return [];
      return (data?.forms as ValidatedForm[]) || [];
    },
  });
}
