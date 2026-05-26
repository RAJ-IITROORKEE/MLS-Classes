"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "information-collected", title: "Information We Collect" },
    { id: "how-we-use", title: "How We Use Information" },
    { id: "security", title: "Security" },
    { id: "cookies", title: "Cookies" },
    { id: "controlling-information", title: "Controlling Your Data" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4 border-b border-border pb-8">
        <div className="inline-block">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Legal Document
          </span>
        </div>
        <h1 className="text-4xl font-bold sm:text-5xl text-foreground">
          Privacy Policy
        </h1>
        <p className="text-base text-muted-foreground">
          Last updated on <span className="font-semibold">October 26th, 2023</span>
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Desktop Sidebar - Table of Contents */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-32 space-y-2 rounded-lg bg-muted/30 p-4 border border-border/50">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Quick Links
            </p>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded transition-colors"
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-10">
          {/* Introduction Section */}
          <section id="introduction" className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Introduction</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                This privacy policy sets out how MLS Classes uses and protects any information that you give MLS Classes when you use this website.
              </p>
              <p>
                MLS Classes is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, you can be assured that it will only be used in accordance with this privacy statement.
              </p>
              <p className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
                MLS Classes may change this policy from time to time by updating this page. You should check this page periodically to ensure that you are happy with any changes.
              </p>
            </div>
          </section>

          {/* Information We Collect Section */}
          <section id="information-collected" className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Information We Collect</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We may collect the following information:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Name and job title</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Contact information including email address</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Demographic information such as postcode, preferences, and interests</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Other information relevant to customer surveys and/or offers</span>
                </li>
              </ul>
            </div>
          </section>

          {/* How We Use Information Section */}
          <section id="how-we-use" className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">What We Do With the Information We Gather</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We require this information to understand your needs and provide you with a better service. Specifically:</p>
              <div className="space-y-3 ml-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Internal Record Keeping</h3>
                  <p className="text-sm">We maintain accurate records of all interactions and transactions.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Product & Service Improvement</h3>
                  <p className="text-sm">We may use the information to improve our products and services.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Communication</h3>
                  <p className="text-sm">We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Market Research</h3>
                  <p className="text-sm">From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax, or mail.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Customization</h3>
                  <p className="text-sm">We may use the information to customize the website according to your interests.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Security</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable measures.
              </p>
            </div>
          </section>

          {/* Cookies Section */}
          <section id="cookies" className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">How We Use Cookies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes, and dislikes by gathering and remembering information about your preferences.
              </p>
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Our Use of Cookies</h3>
                <p>
                  We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.
                </p>
                <p>
                  Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.
                </p>
              </div>
              <div className="space-y-3 bg-muted/30 rounded-lg p-4 border border-border/50">
                <h3 className="font-semibold text-foreground">Cookie Preferences</h3>
                <p className="text-sm">
                  You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
                </p>
              </div>
            </div>
          </section>

          {/* Controlling Information Section */}
          <section id="controlling-information" className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Controlling Your Personal Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You may choose to restrict the collection or use of your personal information in the following ways:</p>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at <a href="mailto:ritik@mlsclasses.com" className="text-primary font-semibold hover:underline">ritik@mlsclasses.com</a>.</span>
                </li>
              </ul>
              <p className="mt-4">
                We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.
              </p>
              <p>
                If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible at the above address. We will promptly correct any information found to be incorrect.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mt-12 rounded-lg bg-primary/5 border border-primary/20 p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Questions About Our Privacy Policy?</h3>
            <p className="text-sm text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a
                href="mailto:ritik@mlsclasses.com"
                className="font-semibold text-primary hover:underline"
              >
                ritik@mlsclasses.com
              </a>
            </p>
          </section>

          {/* Navigation Links */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
            <Link
              href="/terms-conditions"
              className="group flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <span>← Terms & Conditions</span>
            </Link>
            <Link
              href="/cancellation-refund"
              className="group flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors ml-auto"
            >
              <span>Cancellation & Refund</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
