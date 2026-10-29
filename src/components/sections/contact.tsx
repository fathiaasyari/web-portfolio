import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { contact, footer, person } from "@/content/site";
import { CopyEmail } from "@/components/copy-email";
import { CvButton, isTodo, MaybeLink, Text } from "@/components/ui";
import { ScrollOrnament } from "@/components/scroll-ornament";
import "@/components/folio.css";
import "@/components/folio-finishing.css";

async function BuildYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Contact() {
  const email = contact.email;
  const headingParts = contact.heading.split(/\*([^*]+)\*/);
  return (
      <section id="contact" aria-labelledby="contact-title" className="folio-contact folio-finished">
        <div className="folio-contactInner">
          <div className="folio-contactHeadingRow"><h2 id="contact-title">{headingParts.map((part, index) => <span key={index} className={index % 2 ? "folio-contactAccent" : undefined}>{part}</span>)}</h2><ScrollOrnament variant="letter" className="folio-contactOrnament" /></div>
          <div className="folio-contactGrid">
          <div className="folio-contactIntro">
            <p>{contact.body}</p>
            <CvButton variant="secondary" className="folio-contactCv" />
          </div>
          <div className="folio-contactDetails">
            <div className="folio-emailRow">
              <Mail aria-hidden size={20} strokeWidth={1.5} />
              {isTodo(email) ? (
                <div className="folio-emailPending"><span>Email · to be confirmed</span><Text value={email} /></div>
              ) : (
                <>
                  <a href={`mailto:${email}`} className="folio-emailLink">{email}</a>
                  <CopyEmail email={email} />
                </>
              )}
            </div>
            <ul className="folio-socialLinks">
              {contact.links.map((link) => (
                <li key={link.label}><MaybeLink link={link} className="folio-socialLink"><span>{link.label}{isTodo(link.href) && <span className="folio-linkPending" aria-hidden>Coming soon</span>}</span>{!isTodo(link.href) && <ArrowUpRight aria-hidden size={20} strokeWidth={1.5} />}</MaybeLink></li>
              ))}
            </ul>
          </div>
          </div>
        </div>
      </section>
  );
}

export function SiteFooter() {
  return (
      <footer className="folio-footer folio-finished">
        <div className="folio-footerInner">
          <div className="folio-footerTop">
            <a href="#home" className="folio-footerWordmark" aria-label={`${person.fullName} — return to the beginning`}>{person.wordmark}<span>.</span></a>
            <ScrollOrnament variant="bloom" className="folio-footerBloom" />
            <a href="#home" className="folio-backTop">Back to top<span><ArrowUp aria-hidden size={20} strokeWidth={1.5} /></span></a>
          </div>
          <div className="folio-footerBottom">
          <p>© <BuildYear /> {person.fullName}</p>
          <p>{footer.note}</p>
          </div>
        </div>
      </footer>
  );
}
