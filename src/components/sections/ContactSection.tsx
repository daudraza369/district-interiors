import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const projectTypes = [
  'Plantscaping',
  'Tree Customization',
  'Green Walls',
  'Planters',
  'Maintenance',
  'Other',
];

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', projectType: '', message: '' });
  };

  return (
    <section id="contact" ref={ref} className="section-padding bg-night-green pattern-overlay relative overflow-hidden">
      <div className="container-luxury relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-ivory mb-4">Let's Bring Nature Into Your Space</h2>
          <p className="text-body-large text-stone max-w-2xl mx-auto">
            Connect with our design team to start your project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-ivory/10 border-ivory/20 text-ivory placeholder:text-stone/60 h-14 px-5"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-ivory/10 border-ivory/20 text-ivory placeholder:text-stone/60 h-14 px-5"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                >
                  <SelectTrigger className="bg-ivory/10 border-ivory/20 text-ivory h-14 px-5 [&>span]:text-stone/60 data-[state=open]:text-ivory">
                    <SelectValue placeholder="Project Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-ivory border-stone/30">
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-night-green">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <Textarea
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="bg-ivory/10 border-ivory/20 text-ivory placeholder:text-stone/60 px-5 py-4 resize-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <Button type="submit" variant="hero" size="xl" className="w-full">
                  Get in Touch
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ivory/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-pear" />
                </div>
                <div>
                  <h4 className="text-ivory mb-1">Phone</h4>
                  <p className="text-stone">[Phone Number Placeholder]</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ivory/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-pear" />
                </div>
                <div>
                  <h4 className="text-ivory mb-1">Email</h4>
                  <p className="text-stone">[Email Placeholder]</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ivory/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-pear" />
                </div>
                <div>
                  <h4 className="text-ivory mb-1">Location</h4>
                  <p className="text-stone">[City, Country Placeholder]</p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="pt-6 border-t border-ivory/10">
                <p className="text-stone mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-ivory/10 hover:bg-pear/30 flex items-center justify-center transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-ivory" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-ivory/10 hover:bg-pear/30 flex items-center justify-center transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-ivory" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
