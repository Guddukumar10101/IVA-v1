// 'use client';

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';

// export default function FAQPage() {
//   const faqs = [
//     {
//       question: 'Can I manage bookings in real-time?',
//       answer:
//         'Yes, Atithi Cloud lets you manage live bookings, cancellations, and room availability instantly from a single dashboard.',
//     },
//     {
//       question: 'Does this platform support mobile use?',
//       answer:
//         'Absolutely. You and your staff can access it from any device, including tablets and smartphones.',
//     },
//     {
//       question: 'Can I generate invoices and reports?',
//       answer:
//         'Yes. You can generate, download, and email invoices, guest summaries, and revenue reports in just a few clicks.',
//     },
//     {
//       question: 'Is there support for multiple hotel branches?',
//       answer:
//         'Of course! Atithi Cloud is built to handle multiple properties from one central dashboard.',
//     },
//   ];

//   return (
//     <section className="py-20 bg-white dark:bg-background">
//       <div className="max-w-3xl mx-auto px-6">
//         {/* Section Heading */}
//         <h2 className="text-4xl font-bold mb-6 text-charcoal dark:text-high font-[Poppins]">
//           FAQ:
//         </h2>
//         <p className="text-gray-600 dark:text-muted-foreground mb-10 font-[Work Sans]">
//           Here are some common questions about using Atithi Cloud for your hotel.
//         </p>

//         {/* Accordion */}
//         <Accordion type="single" collapsible className="w-full">
//           {faqs.map((faq, idx) => (
//             <AccordionItem
//               key={idx}
//               value={`faq-${idx}`}
//               className="mb-4 border border-border rounded-lg shadow-sm"
//             >
//               <AccordionTrigger className="font-[Work Sans] text-lg px-4 py-3 text-left text-charcoal dark:text-high hover:bg-mint/20">
//                 {faq.question}
//               </AccordionTrigger>
//               <AccordionContent className="px-4 py-3 text-muted-foreground font-[Work Sans]">
//                 {faq.answer}
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </div>
//     </section>
//   );
// }


// 'use client';
// import { useState } from 'react';
// import { faqData } from '../data/faqData'; // Import data

// const FaqSection = () => {
//   const [openIndex, setOpenIndex] = useState<{ [key: string]: number | null }>({});

//   const toggleQuestion = (section: string, index: number) => {
//     setOpenIndex(prev => ({
//       ...prev,
//       [section]: prev[section] === index ? null : index
//     }));
//   };

//   return (
//     <div className="space-y-8">
//       {faqData.map(({ section, faqs }) => (
//         <div key={section}>
//           <h2 className="text-xl font-semibold mb-4">{section}</h2>
//           <div className="space-y-2">
//             {faqs.map((faq, index) => (
//               <div
//                 key={index}
//                 className="border rounded p-4 cursor-pointer"
//                 onClick={() => toggleQuestion(section, index)}
//               >
//                 <div className="font-medium">{faq.question}</div>
//                 {openIndex[section] === index && (
//                   <div className="text-sm text-gray-700 mt-2">{faq.answer}</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FaqSection;
