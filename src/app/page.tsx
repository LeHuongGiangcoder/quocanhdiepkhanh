import { Agenda } from "@/components/Agenda";
import { Details } from "@/components/Details";
import { Dresscode } from "@/components/Dresscode";
import { Hero } from "@/components/Hero";
import { Rsvp } from "@/components/Rsvp";
import { ThankYou } from "@/components/ThankYou";

export default function Page() {
  return (
    <main>
      <Hero />
      <Details />
      <Agenda />
      <Dresscode />
      <Rsvp />
      <ThankYou />
    </main>
  );
}
