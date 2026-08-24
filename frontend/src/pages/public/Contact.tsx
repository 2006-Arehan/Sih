import React, { useState } from 'react';
import { TopGovernmentBar } from '../../components/layout/TopGovernmentBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { MapPin, Phone, Mail, Clock, Building, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    district: 'Pune',
    role: 'Institute',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-govbg flex flex-col">
      <TopGovernmentBar />
      <Navbar />

      <section className="bg-govnavy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-400 bg-saffron-500/10 px-3 py-1 rounded-full border border-saffron-500/20 inline-block mb-3">
            State Coordination Helpdesk
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact SkillPulse Maharashtra
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl leading-relaxed">
            Reach out to the State Skill Directorate, MSBTE technical support, or regional District Skill Development Committees (DSDC).
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 bg-white border-slate-200 space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-govnavy-950 mb-1">
                  Central Secretariat
                </h3>
                <p className="text-xs text-slate-500">
                  Department of Skill, Employment, Entrepreneurship & Innovation
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <Building className="w-4 h-4 text-saffron-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Headquarters Address:</strong>
                    <span>5th Floor, Mantralaya Annex, Madam Cama Road, Nariman Point, Mumbai - 400032.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Toll-Free Helpline:</strong>
                    <span>1800-120-8040 (Mon-Fri, 9:30 AM - 6:00 PM IST)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Official Inquiries:</strong>
                    <span>support.skillpulse@maharashtra.gov.in</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Working Hours:</strong>
                    <span>Monday to Friday (Except Public Holidays)</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Regional Helplines */}
            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-govnavy-950 uppercase tracking-wider text-[10px]">
                Division Facilitation Desks
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>• Pune: 020-26123456</div>
                <div>• Mumbai: 022-22874100</div>
                <div>• Nagpur: 0712-2567890</div>
                <div>• Chh. Sambhajinagar: 0240-2345678</div>
                <div>• Nashik: 0253-2456789</div>
                <div>• Amravati: 0721-2678901</div>
              </div>
            </div>
          </div>

          {/* Form (7 cols on lg) */}
          <div className="lg:col-span-7">
            <Card className="p-8 bg-white border-slate-200">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-govnavy-950">
                    Inquiry Received Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Thank you. Your reference ticket <strong>#MH-SKILL-2026-9842</strong> has been logged with the District Skill Development Facilitation Committee.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                    className="mt-4"
                  >
                    Submit Another Query
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-govnavy-950 mb-1">
                      Send an Official Inquiry
                    </h3>
                    <p className="text-xs text-slate-500">
                      Our technical and policy officers typically respond within 24 to 48 business hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="e.g. Ramesh Kulkarni"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                      label="Official Email"
                      type="email"
                      placeholder="name@organization.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <Select
                      label="Administrative District"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      options={[
                        { value: 'Pune', label: 'Pune' },
                        { value: 'Mumbai City', label: 'Mumbai City' },
                        { value: 'Mumbai Suburban', label: 'Mumbai Suburban' },
                        { value: 'Thane', label: 'Thane' },
                        { value: 'Nagpur', label: 'Nagpur' },
                        { value: 'Nashik', label: 'Nashik' },
                        { value: 'Chhatrapati Sambhajinagar', label: 'Chhatrapati Sambhajinagar' },
                        { value: 'Kolhapur', label: 'Kolhapur' },
                        { value: 'Solapur', label: 'Solapur' },
                        { value: 'Satara', label: 'Satara' },
                        { value: 'Other', label: 'Other District' }
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-govnavy-900 mb-1.5">
                      Inquiry Details / Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your inquiry regarding curriculum alignment, employer registration, or district training programs..."
                      className="w-full text-sm rounded-lg border border-slate-300 p-3 text-slate-900 focus:outline-none focus:border-govnavy-800 focus:ring-2 focus:ring-govnavy-800/15"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    Submit Official Query
                  </Button>
                </form>
              )}
            </Card>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
