import { Layout } from "@/components/Layout";
import { About } from "@/components/About";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Award, Users, Building2, Globe } from "lucide-react";
import marbleGraniteImg from "@/assets/marble-granite.jpg";
import designerCollectionImg from "@/assets/designer-collection.jpg";

const stats = [
  { icon: Award, value: "40+", label: "Years Experience" },
  { icon: Users, value: "180+", label: "Happy Clients" },
  { icon: Building2, value: "10K+", label: "Finished Tasks" },
  { icon: Users, value: "20", label: "Team Members" },
];

const timeline = [
  { year: "1982", title: "Foundation", desc: "Asian Tiles established as paver blocks manufacturer" },
  { year: "1995", title: "ISI Certification", desc: "Received ISI Licensed Certification for quality assurance" },
  { year: "2010", title: "Expansion", desc: "Launched comprehensive precast products line" },
  { year: "2024", title: "Digital Era", desc: "180+ clients and growing with digital presence" },
];

const asianValues = [
  {
    letter: "A",
    value: "Assured Quality",
    title: "Assured Quality",
    description: "ISI Licensed Certified products that meet the highest industry standards",
  },
  {
    letter: "S",
    value: "Synergize",
    title: "Synergize",
    description: "Collaborate with clients to deliver customized solutions",
  },
  {
    letter: "I",
    value: "Innovation",
    title: "Innovation",
    description: "Continuously evolving designs and manufacturing processes",
  },
  {
    letter: "A",
    value: "Always take Data-Based Decisions",
    title: "Always take Data-Based Decisions",
    description: "Integrating Insights for Better Problem Solving",
  },
  {
    letter: "N",
    value: "Never Be Satisfied & Keep Learning",
    title: "Never Be Satisfied & Keep Learning",
    description: "Committed to continuous improvement and excellence",
  },
];

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={marbleGraniteImg}
            alt="About Asian Tiles - Serving since 1982"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="inline-block bg-accent/90 backdrop-blur-sm px-6 py-2 rounded-full text-accent-foreground font-semibold mb-4">
              Serving Since 1982
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight">
              Our <span className="text-accent">Story</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Our journey began in 1982, inspired by the vision of our late beloved founder, Shri Ram Das Makhija. With passion and dedication, he established our tile and paver manufacturing company on the principles of quality, innovation, and integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 gradient-premium">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="text-4xl font-display font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <About />

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              The ASIAN Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {asianValues.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-elegant hover:shadow-premium transition-smooth hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-display font-bold text-primary">{value.letter}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 md:py-32 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Our Leadership
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the visionaries behind Asian Tiles' success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Founder */}
            <div className="bg-card rounded-2xl shadow-premium overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-accent/20 border-4 border-accent mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-display font-bold text-accent">RM</span>
                  </div>
                  <p className="text-muted-foreground">In Loving Memory</p>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  Shri Ram Das Makhija
                </h3>
                <p className="text-accent font-semibold mb-4">Founder (Late)</p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  With passion and dedication, he established our tile and paver manufacturing company in 1982 on the principles of quality, innovation, and integrity.
                </p>
                <p className="text-muted-foreground leading-relaxed italic">
                  "His commitment to excellence continues to guide and inspires us even today. Though he is no longer with us, his legacy lives on in every product we create."
                </p>
              </div>
            </div>

            {/* Managing Director */}
            <div className="bg-card rounded-2xl shadow-premium overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-accent/20 border-4 border-accent mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-display font-bold text-accent">MD</span>
                  </div>
                  <p className="text-muted-foreground">Photo Coming Soon</p>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  Managing Director
                </h3>
                <p className="text-accent font-semibold mb-4">Managing Director&apos;s Desk</p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We are committed to total customer satisfaction by identifying their specific needs, translating them into Quality products and providing dependable after-sales-services.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This commitment is the corner stone of our Quality Policy and we strive to achieve it by putting into place a Quality System which adheres to the ISI Quality Standard.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We plan to achieve this goal through our strength - the Employees; and seek their continuous involvement in achieving the Company&apos;s objectives. I therefore, seek continued patronage of our valued customers, cooperation of our employees and thank our well wishers who have contributed to the growth of the organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <WhyChooseUs />

      {/* Vision & Mission */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-card rounded-2xl p-12 shadow-elegant hover:shadow-premium transition-smooth">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                The logo ASIAN means quality itself means that the company believes in providing quality products to the consumers and totally believes in consumer satisfaction.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                To provide everlasting quality products so that people experience innovation and value.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-12 shadow-elegant hover:shadow-premium transition-smooth">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="text-3xl">👁️</span>
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To be India&apos;s most trusted manufacturer of paver blocks and precast products, setting benchmarks in quality, durability, and design. We envision infrastructure that lasts generations while inspiring aesthetic excellence.
              </p>
            </div>
          </div>
        </div>
      </section>


    </Layout>
  );
};

export default AboutPage;
