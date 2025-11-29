
import smartCityLogo from "@/assets/client_logos/Smart_City_Raipur.png";
import rajatLogo from "@/assets/client_logos/rajat buildtec logo.svg";
import hpGasLogo from "@/assets/client_logos/hp gas.jpg";
import indianOilLogo from "@/assets/client_logos/iocl logo.gif";
import jindalLogo from "@/assets/client_logos/jindal-steel-logo-white.svg";
import moshVarayaLogo from "@/assets/client_logos/mosh varaya logo.png";
import ambujaLogo from "@/assets/client_logos/ambuja mall logo.jpg";
import rahejaLogo from "@/assets/client_logos/raheja-group-logo.jpg";
import singhaniyaLogo from "@/assets/client_logos/singhaniya group logo.png";

export const ClientLogos = () => {
    return (
        <section className="relative z-20 -mt-12 mb-20">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-xl shadow-premium p-10 md:p-12 max-w-7xl mx-auto animate-fade-in">
                    <p className="text-center text-base md:text-lg font-semibold text-muted-foreground mb-10 uppercase tracking-wider">
                        Trusted by Industry Leaders
                    </p>

                    <div className="relative overflow-hidden">
                        <div className="flex gap-16 md:gap-24 items-center animate-marquee whitespace-nowrap">
                            {[
                                { name: "Raipur Smart City", logo: smartCityLogo },
                                { name: "Rajat Buildtech", logo: rajatLogo },
                                { name: "HP Gas", logo: hpGasLogo },
                                { name: "Indian Oil", logo: indianOilLogo },
                                { name: "Jindal Steel & Power", logo: jindalLogo, className: "invert" },
                                { name: "Mosh Varaya", logo: moshVarayaLogo },
                                { name: "Ambuja Mall", logo: ambujaLogo },
                                { name: "Raheja Group", logo: rahejaLogo },
                                { name: "Singhaniya Group", logo: singhaniyaLogo },
                                // Duplicate for seamless loop
                                { name: "Raipur Smart City", logo: smartCityLogo },
                                { name: "Rajat Buildtech", logo: rajatLogo },
                                { name: "HP Gas", logo: hpGasLogo },
                                { name: "Indian Oil", logo: indianOilLogo },
                                { name: "Jindal Steel & Power", logo: jindalLogo, className: "invert" },
                                { name: "Mosh Varaya", logo: moshVarayaLogo },
                                { name: "Ambuja Mall", logo: ambujaLogo },
                                { name: "Raheja Group", logo: rahejaLogo },
                                { name: "Singhaniya Group", logo: singhaniyaLogo },
                            ].map((client, index) => (
                                <div key={index} className="flex items-center justify-center min-w-[180px] md:min-w-[220px]">
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        className={`h-16 md:h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 ${client.className ? client.className : "mix-blend-multiply"}`}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Gradient Masks */}
                        <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                        <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
};
