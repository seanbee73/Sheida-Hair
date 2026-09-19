import React, { useState } from 'react';
import { SALON_INFO, STYLISTS_TEAM } from '../data/salonData';
import { BookingInquiry } from '../types';

interface ContactBookingSectionProps {
  preselectedService?: string;
  preselectedStylist?: string;
  bookingsCount?: number;
  onNewBooking?: (booking: BookingInquiry) => void;
  onOpenBookingsInbox?: () => void;
}

export const ContactBookingSection: React.FC<ContactBookingSectionProps> = ({
  preselectedService,
  preselectedStylist,
  bookingsCount = 0,
  onNewBooking,
  onOpenBookingsInbox,
}) => {
  const [bookingData, setBookingData] = useState<BookingInquiry>({
    name: '',
    phone: '',
    email: '',
    preferredStylist: preselectedStylist || 'First Available Master Specialist',
    serviceCategory: preselectedService || 'Haircut & Blowdry with Haik',
    preferredDate: '',
    preferredTime: '11:00 AM',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<BookingInquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync prop changes
  React.useEffect(() => {
    if (preselectedService) {
      setBookingData((prev) => ({ ...prev, serviceCategory: preselectedService }));
    }
  }, [preselectedService]);

  React.useEffect(() => {
    if (preselectedStylist) {
      setBookingData((prev) => ({ ...prev, preferredStylist: preselectedStylist }));
    }
  }, [preselectedStylist]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.name.trim() || !bookingData.phone.trim()) {
      setErrorMsg('Please enter your name and contact phone number.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    const generatedId = `SH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: BookingInquiry = {
      ...bookingData,
      id: generatedId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedBooking(newRecord);
      if (onNewBooking) {
        onNewBooking(newRecord);
      }
    }, 600);
  };

  return (
    <section
      id="booking"
      className="max-w-[1400px] mx-auto w-full py-20 px-6 relative scroll-mt-24 aura-reveal text-left"
    >
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Column: Salon Location, Schedule & Contact */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#d8b485]"></div>
            <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase">
              Appointments &amp; Inquiries
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-[1.1] max-w-md aura-reveal">
            Book your session at Sheida Hair Studio.
          </h2>

          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-10 max-w-md">
            Call us directly or submit your appointment request below. For major blonde transformations, balayage, and colour correction, we begin with a strand test and diagnostic.
          </p>

          <div className="space-y-6 mb-10">
            {/* Phone direct */}
            <div className="flex items-start gap-4">
              <iconify-icon
                icon="solar:phone-calling-linear"
                class="text-2xl text-[#d8b485] shrink-0 mt-1"
              ></iconify-icon>
              <div>
                <h4 className="text-[10px] font-bold text-white tracking-widest mb-1 uppercase">
                  Telephone (Direct Appointments)
                </h4>
                <a
                  href={`tel:${SALON_INFO.phoneRaw}`}
                  className="text-lg font-mono font-bold text-[#d8b485] hover:underline"
                >
                  {SALON_INFO.phone}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <iconify-icon
                icon="solar:map-point-linear"
                class="text-2xl text-[#d8b485] shrink-0 mt-1"
              ></iconify-icon>
              <div>
                <h4 className="text-[10px] font-bold text-white tracking-widest mb-1 uppercase">
                  Studio Address &amp; Parking
                </h4>
                <p className="text-sm text-zinc-300 font-medium">{SALON_INFO.address}</p>
                <p className="text-xs text-zinc-500 mt-1">{SALON_INFO.transit}</p>
                <p className="text-xs text-zinc-500">{SALON_INFO.parking}</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4">
              <iconify-icon
                icon="solar:clock-circle-linear"
                class="text-2xl text-[#d8b485] shrink-0 mt-1"
              ></iconify-icon>
              <div className="w-full">
                <h4 className="text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                  Studio Hours
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-zinc-400 font-mono">
                  {SALON_INFO.hours.map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-white/5 py-1">
                      <span>{h.day}</span>
                      <span className="text-zinc-300">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Online Booking Form */}
        <div className="flex-1 lg:max-w-xl w-full">
          {submittedBooking ? (
            <div className="bg-[#0c0c0e] p-8 md:p-12 border border-[#d8b485]/30 text-left animate-fadeIn">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-[#d8b485]/10 flex items-center justify-center text-[#d8b485]">
                  <iconify-icon icon="solar:check-circle-linear" style={{ fontSize: '28px' }}></iconify-icon>
                </div>
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-[#d8b485] font-mono text-xs rounded font-bold">
                  Reference: #{submittedBooking.id}
                </span>
              </div>

              <h3 className="text-xl font-medium text-white mb-2 uppercase tracking-wide">
                Booking Request Recorded
              </h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                Thank you, {submittedBooking.name}! We have received your appointment request for{' '}
                <strong className="text-white">{submittedBooking.serviceCategory}</strong> with{' '}
                <strong className="text-[#d8b485]">{submittedBooking.preferredStylist}</strong>. Donya or Nema from our guest desk will reach out to you at <strong className="text-white">{submittedBooking.phone}</strong> to confirm your slot.
              </p>

              <div className="p-4 bg-[#09090b] border border-white/5 text-xs text-zinc-400 font-mono mb-6 space-y-1">
                <p>📋 <strong className="text-zinc-200">Status:</strong> 🟡 Pending Desk Confirmation</p>
                <p>📍 <strong className="text-zinc-200">Studio:</strong> 124 Willowdale Ave, North York</p>
                <p>📞 <strong className="text-zinc-200">Guest Desk:</strong> (416) 209-8060</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {onOpenBookingsInbox && (
                  <button
                    type="button"
                    onClick={onOpenBookingsInbox}
                    className="flex-1 px-5 py-3 text-[10px] font-bold tracking-widest text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277] uppercase transition-colors flex items-center justify-center gap-1.5 font-bold"
                  >
                    <iconify-icon icon="solar:inbox-line-bold" class="text-sm"></iconify-icon>
                    <span>View in Admin Inbox</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedBooking(null);
                    setBookingData({
                      name: '',
                      phone: '',
                      email: '',
                      preferredStylist: 'First Available Master Specialist',
                      serviceCategory: 'Haircut & Blowdry with Haik',
                      preferredDate: '',
                      preferredTime: '11:00 AM',
                      notes: '',
                    });
                  }}
                  className="px-5 py-3 text-[10px] font-bold tracking-widest text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 uppercase transition-colors text-center"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-[#0c0c0e] p-8 md:p-12 border border-white/5 text-left relative"
            >
              <div className="border-b border-white/5 pb-4 mb-2 flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-white uppercase">
                    Appointment Request Form
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Fill in your details and preferred specialist. We will confirm your timing promptly.
                  </p>
                </div>
                {onOpenBookingsInbox && (
                  <button
                    type="button"
                    onClick={onOpenBookingsInbox}
                    className="text-[9px] font-bold tracking-wider text-[#d8b485] hover:underline uppercase flex items-center gap-1 shrink-0 bg-white/5 px-2.5 py-1.5 rounded border border-white/10"
                    title="View salon owner / staff booking requests inbox in Admin"
                  >
                    <iconify-icon icon="solar:shield-keyhole-bold"></iconify-icon>
                    <span>Admin ({bookingsCount})</span>
                  </button>
                )}
              </div>

              {errorMsg && (
                <div className="p-3 text-xs bg-red-950/40 border border-red-500/30 text-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485] placeholder:text-zinc-700"
                    placeholder="e.g. Niloofar Heirani"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485] placeholder:text-zinc-700"
                    placeholder="e.g. (416) 209-8060"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485] placeholder:text-zinc-700"
                    placeholder="your.email@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                    Preferred Specialist
                  </label>
                  <select
                    value={bookingData.preferredStylist}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, preferredStylist: e.target.value })
                    }
                    className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                  >
                    <option value="First Available Master Specialist">
                      First Available Master Specialist
                    </option>
                    {STYLISTS_TEAM.map((st) => (
                      <option key={st.id} value={st.name}>
                        {st.name} ({st.role.split('&')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                  Service Requested
                </label>
                <select
                  value={bookingData.serviceCategory}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, serviceCategory: e.target.value })
                  }
                  className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                >
                  <option value="Haircut & Blowdry with Haik">
                    Haircut &amp; Blowdry with Haik ($120+)
                  </option>
                  <option value="Signature Dimensional Balayage">
                    Signature Dimensional Balayage ($400+)
                  </option>
                  <option value="Full Highlights & Babylights">
                    Full Highlights &amp; Babylights ($500+)
                  </option>
                  <option value="Bleach & Full Blonding Transformation">
                    Bleach &amp; Full Blonding Transformation ($500+)
                  </option>
                  <option value="Haircolor Consultation + Strand Test">
                    Haircolor Consultation + Strand Test ($0 Complimentary)
                  </option>
                  <option value="Root Touch-Up & Gray Coverage">
                    Root Touch-Up &amp; Gray Coverage ($100+)
                  </option>
                  <option value="Root Color + Gloss Toner">
                    Root Color + Gloss Toner ($150+)
                  </option>
                  <option value="Partial Highlights & Face Framing">
                    Partial Highlights &amp; Face Framing ($400+)
                  </option>
                  <option value="Creative / Fantasy & Pastel Color">
                    Creative / Fantasy &amp; Pastel Color ($300+)
                  </option>
                  <option value="Master Color Correction">
                    Master Color Correction ($500+)
                  </option>
                  <option value="VIP Bespoke Color Package">
                    VIP Bespoke Color Package ($1,000+)
                  </option>
                  <option value="Team Haircut & Blowdry (Women · 16+)">
                    Team Haircut &amp; Blowdry ($80+)
                  </option>
                  <option value="Blowdry + Hot Tool Finish">
                    Blowdry + Hot Tool Finish ($60+)
                  </option>
                  <option value="Wash & Classic Blowdry">
                    Wash &amp; Classic Blowdry ($50+)
                  </option>
                  <option value="Milbon 5-Step Japanese Moisture Treatment">
                    Milbon 5-Step Japanese Treatment ($100)
                  </option>
                  <option value="Keratin Smoothing Treatment">
                    Keratin Smoothing Treatment ($400+)
                  </option>
                  <option value="Hair Botox & Protein Rebuild">
                    Hair Botox &amp; Protein Rebuild ($400+)
                  </option>
                  <option value="Deep Hair Hydration Spa">
                    Deep Hair Hydration Spa ($85+)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={bookingData.preferredDate}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, preferredDate: e.target.value })
                    }
                    className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                    Preferred Time
                  </label>
                  <select
                    value={bookingData.preferredTime}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, preferredTime: e.target.value })
                    }
                    className="w-full bg-[#09090b] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d8b485]"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:30 PM">2:30 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:30 PM">5:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-white tracking-widest mb-2 uppercase">
                  Hair Details &amp; History (Bleach, Tone, Layers)
                </label>
                <textarea
                  rows={3}
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  className="w-full bg-[#09090b] border border-white/10 p-4 text-xs text-white focus:outline-none focus:border-[#d8b485] placeholder:text-zinc-700 resize-none"
                  placeholder="Tell us about your natural hair color, past bleach/box dye history, or desired haircut/balayage look..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-8 py-4 text-[10px] font-bold tracking-widest text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277] transition-all uppercase disabled:opacity-50 font-bold"
              >
                {isSubmitting ? 'Sending Request...' : 'Send Booking Request →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
