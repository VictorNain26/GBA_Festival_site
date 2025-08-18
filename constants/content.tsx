/**
 * Centralized content for the festival site, organized by language.
 * This separation improves maintainability and potentially enables
 * future CMS integration or dynamic content loading.
 */

import React from 'react';
import type { 
  NavigationLabels, 
  HeroContent, 
  PartnerCategory, 
  ContactContent,
  Language 
} from '@/types';

// Navigation labels per language
export const NAV_LABELS: Record<Language, NavigationLabels> = {
  fr: {
    hero: 'Accueil',
    about: 'Art Deco et Neo Art Deco', 
    partners: 'Nos Partenaires',
    ontheway: 'On the Way',
    decoball: 'Le Bal Art Deco',
    contact: 'Contact',
    tickets: 'Billeterie',
  },
  en: {
    hero: 'Home',
    about: 'Art Deco and Neo Art Deco',
    partners: 'Our Partners', 
    ontheway: 'On the Way',
    decoball: 'The Art Deco Ball',
    contact: 'Contact',
    tickets: 'Tickets',
  },
};

// Section titles (for display in sections, different from navigation)
export const SECTION_TITLES: Record<Language, Record<string, React.ReactNode>> = {
  fr: {
    about: (
      <>
        Art Deco
        <br />
        et Neo Art Deco
      </>
    ),
  },
  en: {
    about: (
      <>
        Art Deco
        <br />
        and Neo Art Deco
      </>
    ),
  },
};

// Hero section content
export const HERO_CONTENT: Record<Language, HeroContent> = {
  fr: {
    title: (
      <>
        Florilege&nbsp;
        <span className="block lg:inline text-accent">de l'Art Deco</span>
      </>
    ),
    subtitle: 'Festival Art Deco et Neo Art Deco',
    date: '18 octobre 2025',
    location: 'Hotel du Collectionneur, Paris 75008',
    cta: 'Billeterie',
  },
  en: {
    title: (
      <>
        Florilege&nbsp;
        <span className="block lg:inline text-accent">of Art Deco</span>
      </>
    ),
    subtitle: 'Art Deco & Neo Art Deco Festival',
    date: '18 October 2025',
    location: 'Hotel du Collectionneur, Paris 75008',
    cta: 'Tickets',
  },
};

// About section content
export const ABOUT_CONTENT: Record<Language, React.ReactNode[]> = {
  fr: [
    <>
      Depuis plus de cent ans <span className="text-accent">l'Art déco</span> séduit le monde. Mais c'est bien l'<span className="text-accent">Exposition Internationale des Arts décoratifs et industriels modernes de Paris</span>, évènement fondateur de l'année <span className="text-accent">125</span>, qui a donné le nom à l'Art Déco.
    </>,
    <>
      Synonyme d'élégance, de modernité et de raffinement <span className="text-accent">Art déco</span> continue d'influencer l'architecture, le design, la peinture et la sculpture, la mode et d'autres, suscitant toujours autant d'enthousiasme parmi les passionnés du monde créatif.
    </>,
    <>
      Ainsi, l'année <span className="text-accent">2025</span> marque le centenaire de l'<span className="text-accent">Exposition Internationale</span> et du mouvement <span className="text-accent">Art déco</span>. Cette date significative pour tous les amateurs de ce mouvement artistique qui a retrouvé sa continuation dans son nouveau format: <span className="text-accent">Néo Art déco</span>.
    </>,
    <>
      Pour célébrer un héritage intemporel et son impact contemporain, notre association <span className="text-accent">Grand Battement d'Ailes</span> initie un évènement exceptionnel, le nouveau Festival Art déco et Néo Art déco nommé <span className="text-accent">« Florilège de l'Art Déco »</span> qui se tiendra le <span className="text-accent">18 octobre 2025</span> au <span className="text-accent">Salon Normandie</span> de l'<span className="text-accent">Hôtel du Collectionneur</span>, une icône architecturale parisienne du style.
    </>,
    <>
      Lors de la première édition du Festival, nos invités vont pleinement profiter du programme riche et varié.
    </>,
  ],
  en: [
    <>
      For more than a century <span className="text-accent">Art Deco</span> has captivated the world. But it was the <span className="text-accent">International Exhibition of Modern Decorative and Industrial Arts in Paris</span>, a landmark event held in <span className="text-accent">1925</span>, that gave the movement its name.
    </>,
    <>
      Synonymous with elegance, modernity and refinement, Art Deco continues to influence architecture, design, painting, sculpture and fashion, still arousing enthusiasm among creative enthusiasts.
    </>,
    <>
      The year <span className="text-accent">2025</span> marks the centenary of the <span className="text-accent">International Exhibition</span> and of the <span className="text-accent">Art Deco</span> movement. This significant date for all lovers of this artistic movement has seen its continuation in a new form: <span className="text-accent">Neo Art Deco</span>.
    </>,
    <>
      To celebrate an timeless heritage and its contemporary impact, our association <span className="text-accent">Grand Battement d'Ailes</span> launches an exceptional event: the new Art Deco and Neo Art Deco Festival called <span className="text-accent">"Florilège de l'Art Déco"</span>, which will be held on <span className="text-accent">18 October 2025</span> in the <span className="text-accent">Normandie Salon</span> at the <span className="text-accent">Hôtel du Collectionneur</span>, a Parisian architectural icon. During this first edition, our guests will enjoy a rich and varied programme.
    </>,
  ],
};

// Partner categories
export const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    key: 'collectors',
    title: { fr: 'Collectionneurs & Galeries', en: 'Collectors & Galleries' },
    desc: {
      fr: 'Des collectionneurs d\'art et galeristes présentent des pièces rares et précieuses, témoins de l\'histoire Art déco.',
      en: 'Art collectors and gallerists present rare and precious pieces that bear witness to Art Deco history.',
    },
  },
  {
    key: 'artists',
    title: { fr: 'Artistes & Sculpteurs', en: 'Artists & Sculptors' },
    desc: {
      fr: 'Peintres, illustrateurs et sculpteurs partagent leurs univers graphiques et plastiques inspirés des Années folles.',
      en: 'Painters, illustrators and sculptors share their graphic and plastic universes inspired by the Roaring Twenties.',
    },
  },
  {
    key: 'fashion',
    title: { fr: 'Maisons & Créateurs', en: 'Houses & Designers' },
    desc: {
      fr: 'Maisons de haute couture, designers et artisans dévoilent des éléments de mode et de design aux lignes Art déco.',
      en: 'Fashion houses, designers and craftsmen unveil fashion and design pieces characterised by Art Deco lines.',
    },
  },
  {
    key: 'jewellery',
    title: { fr: 'Bijoux & Accessoires', en: 'Jewellery & Accessories' },
    desc: {
      fr: 'Créateurs de bijoux et d\'accessoires présentent des collections inspirées des motifs géométriques et des matériaux précieux.',
      en: 'Jewellery and accessory designers present collections inspired by geometric motifs and precious materials.',
    },
  },
  {
    key: 'wine',
    title: { fr: 'Vin & Parfum', en: 'Wine & Perfume' },
    desc: {
      fr: 'Producteurs de vin et de parfum proposent des expériences sensorielles en accord avec l\'esprit festif de l\'évènement.',
      en: 'Wine and perfume producers offer sensory experiences in keeping with the festive spirit of the event.',
    },
  },
];

// Contact content
export const CONTACT_CONTENT: Record<Language, ContactContent> = {
  fr: {
    heading: 'Grand Battement d\'Ailes',
    intro: 'Notre équipe se tient disponible pour répondre à toutes vos questions.',
    phone: '+33 6 64 88 83 70',
    email: 'festivalartdecoparis@gmail.com',
    website: 'https://grandbattementdailes.com',
    whatsapp: 'Envoyer un message',
  },
  en: {
    heading: 'Grand Battement d\'Ailes', 
    intro: 'Our team is available to answer all your questions.',
    phone: '+33 6 64 88 83 70',
    email: 'festivalartdecoparis@gmail.com',
    website: 'https://grandbattementdailes.com',
    whatsapp: 'Send a message',
  },
};

// Partners section introduction
export const PARTNERS_INTRO: Record<Language, React.ReactNode[]> = {
  fr: [
    <>
      Au cœur de cette soirée placée sous le signe du goût et de la convivialité, nos <span className="text-accent">partenaires</span> et <span className="text-accent">exposants</span> vous invitent à un véritable excursion sensoriel. Exposition d'objets d'art, des éléments de collection de mode, artisans, maison de renom ou jeune talents émergents, tous partagent leur univers et savoir-faire. Découvrez une collection exceptionnelle des œuvres et des objets emblématiques qui illustrent l'élégance et l'innovation des mouvement <span className="text-accent">Art déco</span> et <span className="text-accent">Néo art déco</span>.
    </>,
  ],
  en: [
    <>
      At the heart of this evening dedicated to taste and conviviality, our <span className="text-accent">partners</span> and <span className="text-accent">exhibitors</span> invite you on a real sensory journey. Exhibitions of art objects, fashion collectibles, craftsmen, renowned houses and emerging talent – all share their universe and their savoir‑faire. Discover an exceptional collection of works and emblematic objects illustrating the elegance and innovation of the <span className="text-accent">Art Deco</span> and <span className="text-accent">Neo Art Deco</span> movements.
    </>,
  ],
};

// Partners collaboration section
export const PARTNERS_COLLABORATION: Record<Language, React.ReactNode> = {
  fr: (
    <>
      Collectionneurs d'art et galeristes, artistes, sculpteurs, créateurs de bijoux, producteurs du vin et de parfum sont aussi invités pour devenir nos partenaires.
      <br /><br />
      Joignez-les, profitez d'une opportunité inouïe pour la mise en avant auprès de les convives, présenter votre entreprise et montrer le résultat de votre activité lors de notre évènement.
    </>
  ),
  en: (
    <>
      Art collectors and gallerists, artists, sculptors, jewellery designers, wine and perfume producers are also invited to become our partners.
      <br /><br />
      Join them to seize an unprecedented opportunity to showcase your company to our guests, present your creations and display the results of your activity during our event.
    </>
  ),
};

// On the Way section content
export const ON_THE_WAY_CONTENT: Record<Language, React.ReactNode[]> = {
  fr: [
    <>
      <span className="text-accent">ON THE WAY</span>, flashmob et fil rouge de notre soirée, transporte le public au cœur de l'effervescence de l'entre‑deux‑guerres. Nous sommes en <span className="text-accent">1925</span>, entre le Port du Havre et la Gare de Paris : départs, arrivées, émotions et sentiments.
    </>,
    <>
      Une esthétique transatlantique… À bord du fameux paquebot <span className="text-accent">Normandie</span>, les spectateurs sont invités à faire un voyage extraordinaire dirigé par le <span className="text-accent">Vieux Loup de Mer</span>, accompagnés de célébrités et de personnages historiques qui les guident tout au long de la soirée.
    </>,
    <>
      Parmi les voyageurs on reconnaît des artistes, écrivains et intellectuels de ce temps : <span className="text-accent">Coco Chanel</span>, <span className="text-accent">Tamara de Lempicka</span>, <span className="text-accent">Anna Pavlova</span>, <span className="text-accent">Salvador Dalí</span>, <span className="text-accent">Colette</span>, <span className="text-accent">F. Scott et Zelda Fitzgerald</span>… ainsi que des personnages imaginés par les écrivains d'époque.
    </>,
    <>
      Plongez dans l'atmosphère de la vie parisienne de <span className="text-accent">1925</span> : un moment unique qui célèbre les figures emblématiques de l'époque Art déco. Le <span className="text-accent">Salon Normandie</span> de l'<span className="text-accent">Hôtel du Collectionneur</span> est métamorphosé pour laisser place à une ambiance féerique évoquant les plus grandes soirées de l'ère Art déco.
    </>,
    <>
      La mise en scène soigneuse mêlant éléments visuels, sonores et théâtraux est imaginée par <span className="text-accent">Julie Durieux</span>, metteuse en scène et autrice du concept, épaulée par des professionnels de la scène française.
    </>,
  ],
  en: [
    <>
      <span className="text-accent">ON THE WAY</span>, a flashmob and leitmotif of our evening, transports the audience into the effervescence of the interwar period. We are in <span className="text-accent">1925</span>, between the Port of Le Havre and the Gare de Paris – departures, arrivals, emotions and feelings.
    </>,
    <>
      A transatlantic aesthetic… On board the famous <span className="text-accent">Normandie</span> liner, spectators are invited to embark on an extraordinary voyage led by the <span className="text-accent">Old Sea Wolf</span>, accompanied by celebrities and historical figures who guide them throughout the evening.
    </>,
    <>
      Among the travellers we recognise artists, writers and intellectuals of the time: <span className="text-accent">Coco Chanel</span>, <span className="text-accent">Tamara de Lempicka</span>, <span className="text-accent">Anna Pavlova</span>, <span className="text-accent">Salvador Dalí</span>, <span className="text-accent">Colette</span>, <span className="text-accent">F. Scott and Zelda Fitzgerald</span> and more, as well as characters imagined by the writers of the period.
    </>,
    <>
      Immerse yourself in the atmosphere of <span className="text-accent">1925</span> Parisian life: a unique moment celebrating the emblematic figures of the Art Deco era. The <span className="text-accent">Normandie Salon</span> of the <span className="text-accent">Hôtel du Collectionneur</span> is transformed to give way to a magical atmosphere evoking the greatest evenings of the Art Deco era.
    </>,
    <>
      The careful staging combining visual, sound and theatrical elements is imagined by <span className="text-accent">Julie Durieux</span>, director and author of the concept, assisted by professionals of the French stage.
    </>,
  ],
};

// Deco Ball section content - New layout content  
export const DECO_BALL_INTRO: Record<Language, React.ReactNode> = {
  fr: <>
    <span className="text-accent">Laissez vous entrainer</span> par le faste et la sophistication des <span className="text-accent">Années Folles</span> lors de notre soirée dansante, profitez d&apos;un grand <span className="text-accent">Bal Art déco</span> endiablé et mené par notre <span className="text-accent">DJ Mitch</span>, jusqu&apos;au bout de la nuit, pour vivre pleinement l&apos;instant de la joie et de l&apos;art de vivre à la française.
  </>,
  en: <>
    <span className="text-accent">Let yourself be carried away</span> by the splendour and sophistication of the <span className="text-accent">Roaring Twenties</span> during our dance evening. Enjoy a lively <span className="text-accent">Art Deco ball</span> led by our <span className="text-accent">DJ Mitch</span> until the end of the night, to fully experience the moment of joy and the French art of living.
  </>,
};

// Deco Ball section content - Legacy (kept for compatibility)
export const DECO_BALL_CONTENT: Record<Language, React.ReactNode[]> = {
  fr: [
    <>
      Laissez‑vous entraîner par le faste et la sophistication des <span className="text-accent">Années Folles</span> lors de notre soirée dansante. Profitez d'un grand <span className="text-accent">Bal Art déco</span> endiablé, mené par notre <span className="text-accent">DJ Mitch</span> jusqu'au bout de la nuit, pour vivre pleinement l'instant de joie et l'art de vivre à la française.
    </>,
  ],
  en: [
    <>
      Let yourself be carried away by the splendour and sophistication of the <span className="text-accent">Roaring Twenties</span> during our dance evening. Enjoy a lively <span className="text-accent">Art Deco ball</span> led by our <span className="text-accent">DJ Mitch</span> until the end of the night, to fully experience the moment of joy and the French art of living.
    </>,
  ],
};


// Festival objective and public content
export const FESTIVAL_OBJECTIVE: Record<Language, React.ReactNode[]> = {
  fr: [
    <>
      <span className="text-accent font-title text-xl">Public Cible</span><br/>
      Collectionneurs d'art et amateurs éclairés de tous les âges.
    </>,
    <>
      <span className="text-accent font-title text-xl">Notre Objectif</span><br/>
      Promouvoir la culture, l'art et le divertissement, créer des opportunités pour des artistes, des galeries, des artisanats et d'autres professionnels.
    </>,
  ],
  en: [
    <>
      <span className="text-accent font-title text-xl">Target Audience</span><br/>
      Art collectors and enlightened enthusiasts of all ages.
    </>,
    <>
      <span className="text-accent font-title text-xl">Our Objective</span><br/>
      Promote culture, art and entertainment, create opportunities for artists, galleries, craftsmen and other professionals.
    </>,
  ],
};