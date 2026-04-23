import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-earth-deep text-cream">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        <h1 className="font-display text-4xl text-gold mb-2">Politique de confidentialité</h1>
        <p className="text-cream/60 text-sm mb-10">Dernière mise à jour : 23 avril 2026</p>

        <div className="space-y-8 text-cream/85 leading-relaxed">
          <section>
            <h2 className="text-2xl text-gold/90 font-display mb-3">1. Qui sommes-nous ?</h2>
            <p>
              Nzo Mikanda est une plateforme d'apprentissage du Kikongo Lari et de l'écriture
              Mandombe, accessible sur <a href="https://nzomikanda.com" className="text-gold underline">nzomikanda.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gold/90 font-display mb-3">2. Données collectées</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Compte :</strong> email, nom d'affichage (si inscription).</li>
              <li><strong>Apprentissage :</strong> progression, flashcards, corrections de traduction.</li>
              <li><strong>Paiement :</strong> géré par Stripe (nous ne stockons aucune carte bancaire).</li>
              <li><strong>Analytique :</strong> pages visitées, pays, type d'appareil, durée de session.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-gold/90 font-display mb-3">3. Microsoft Clarity</h2>
            <p className="mb-3">
              Avec votre consentement, nous utilisons <strong>Microsoft Clarity</strong> pour
              comprendre comment vous utilisez notre site. Clarity enregistre :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>Les <strong>session replays</strong> (rejouer les clics, scrolls, mouvements de souris).</li>
              <li>Les <strong>heatmaps</strong> (zones les plus consultées).</li>
              <li>Des métadonnées techniques (navigateur, résolution, pays).</li>
            </ul>
            <p>
              Les données sont anonymisées par Microsoft, hébergées sur ses serveurs et soumises à
              la <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-gold underline">politique de confidentialité Microsoft</a>.
              Aucune information sensible saisie (mots de passe, paiements) n'est capturée.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gold/90 font-display mb-3">4. Vos droits (RGPD)</h2>
            <p className="mb-3">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de
              suppression, de portabilité et d'opposition à vos données. Vous pouvez à tout moment :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Retirer votre consentement aux cookies en effaçant les données du site dans votre navigateur.</li>
              <li>Supprimer votre compte en nous contactant.</li>
              <li>Demander un export de vos données.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-gold/90 font-display mb-3">5. Cookies utilisés</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essentiels :</strong> session d'authentification (Supabase). Non désactivables.</li>
              <li><strong>Analytique (Clarity) :</strong> uniquement après consentement explicite.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-gold/90 font-display mb-3">6. Contact</h2>
            <p>
              Pour toute question :{" "}
              <a href="mailto:contact@nzomikanda.com" className="text-gold underline">
                contact@nzomikanda.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
