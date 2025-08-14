// app/contact/page.tsx
import HeroSection from '../components/contacts/HeroSection';
import BackgroundShapes from '../components/contacts/BackgroundSection';
import ContactHeader from '../components/contacts/ContactHeader';
import ContactForm from '../components/contacts/ContactForm';

export default function ContactPage() {
  return (
    <>
      <HeroSection />
      <div className="py-9 relative bg-white">
        <BackgroundShapes />
        <div className="max-w-4xl relative z-10 mx-auto p-8 md:px-20">
          <ContactHeader />
          <ContactForm />
        </div>
      </div>
    </>
  );
}



