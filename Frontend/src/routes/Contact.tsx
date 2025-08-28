import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Link } from "react-router-dom";

const formSchema = z.object({
  program: z.enum([
    "Recreational",
    "Youth Academy",
    "Competitive",
    "Camps",
    "Unsure",
  ]),
  location: z.enum(["Central", "Southwest"]),
  parentFirst: z.string().min(1),
  parentLast: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  playerFirst: z.string().min(1),
  playerLast: z.string().min(1),
  birthDate: z.string().min(1),
  zip: z.string().min(1),
  message: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

export function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted", data);
    reset();
  };

  return (
    <div className="max-w-8xl mx-auto">
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <img
          src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/64c03e731a2734b5d19cdf6b_contact-hero.jpg"
          alt="C3FC Soccer SC Players"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="px-3 py-12 md:px-40">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-5 py-8">
          <div className="text-left mb-8">
            <h1 className="text-4xl font-bold mb-2">YOU'VE GOT QUESTIONS</h1>
            <h2 className="text-3xl text-[#d6226a] mb-4">WE'VE GOT ANSWERS.</h2>
            <p className="text-gray-800 mb-4">
              Prior to contacting us, please navigate the links below which
              detail our program offerings and include pertinent information
              such as: program descriptions, start dates, fee structures, age
              groups, etc.
            </p>
            <p className="text-gray-800 font-semibold">
              <strong>Note:</strong> Birth Year / Age groups are based on the
              Fall 2023-Spring 2024 season
            </p>
          </div>

          {/* Programs List */}
          <div className="space-y-6 mb-8">
            {/* Recreational */}
            <div>
              <h3 className="text-lg font-bold mb-1">
                <a
                  href="https://www.C3FC Soccersc.org/recreational"
                  className="text-[#d6226a] hover:underline"
                >
                  Recreational:
                </a>
              </h3>
              <p className="text-gray-800">
                A simple, convenient, and community based soccer program for
                beginners.
              </p>
              <p className="text-gray-800">
                <strong>Birth years:</strong> 2020 (U4) - 2012 (U12)
              </p>
            </div>

            {/* Youth Academy */}
            <div>
              <h3 className="text-lg font-bold mb-1">
                <a
                  href="https://C3FC Soccersc.org/youth-academy"
                  className="text-[#d6226a] hover:underline"
                >
                  Youth Academy:
                </a>
              </h3>
              <p className="text-gray-800">
                The start of competitive soccer, where your player will rapidly
                advance their technical skills.
              </p>
              <p className="text-gray-800">
                <strong>Birth years:</strong> 2017 (U7) - 2014 (U10)
              </p>
            </div>

            {/* Competitive */}
            <div>
              <h3 className="text-lg font-bold mb-1">
                <a
                  href="https://www.C3FC Soccersc.org/competitive"
                  className="text-[#d6226a] hover:underline"
                >
                  Competitive:
                </a>
              </h3>
              <p className="text-gray-800">
                For players committed to advancing their technical skills and
                who embrace high-level coaching.
              </p>
              <p className="text-gray-800">
                <strong>Birth years:</strong> 2013 (U11) - 2005/06 (U18/19)
              </p>
            </div>
          </div>

          {/* Registration CTA */}
          <div className="text-left my-6">
            <p className="text-gray-800">
              <strong>To register, click:</strong>{" "}
              <Link
                to="/tryouts"
                className="text-[#d6226a] hover:underline font-bold"
              >
                PLAY FOR C3FC SOCCER CLUB
              </Link>
            </p>
          </div>

          {/* Form Intro */}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Required Info Section */}

            {/* Parent Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Parent First Name</Label>
                <Input {...register("parentFirst")} />
                {errors.parentFirst && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>
              <div>
                <Label>Parent Last Name</Label>
                <Input {...register("parentLast")} />
                {errors.parentLast && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input {...register("phone")} />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>
              <div>
                <Label>Email Address</Label>
                <Input type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    Valid email required
                  </p>
                )}
              </div>
            </div>

            {/* Player Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Player First Name</Label>
                <Input {...register("playerFirst")} />
                {errors.playerFirst && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>
              <div>
                <Label>Player Last Name</Label>
                <Input {...register("playerLast")} />
                {errors.playerLast && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>
              <div>
                <Label>Player Birth Date (MM/DD/YYYY)</Label>
                <Input {...register("birthDate")} placeholder="MM/DD/YYYY" />
                {errors.birthDate && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>
              <div>
                <Label>Zip Code</Label>
                <Input {...register("zip")} />
                {errors.zip && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <Label>Message</Label>
              <Textarea {...register("message")} className="min-h-[120px]" />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">Required</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        {/* Success Message */}
        {isSubmitSuccessful && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 border border-green-200 rounded">
            <strong>Thank you!</strong> Your submission has been received, and a
            C3FC Soccer staff member will get back to you within 48 hours.
          </div>
        )}

        {/* Social Section */}
        <div className="bg-gray-100 py-12 px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">
              Follow us for the latest action
            </h2>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" rel="noopener noreferrer">
                <img
                  src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/5ef3bd892340e3bac23e1ac0_icon-facebook-navy.svg"
                  alt="Facebook"
                  className="h-6"
                />
              </a>
              <a href="#" rel="noopener noreferrer">
                <img
                  src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/5ec3f83f2c0e493e867f635a_icon-instagram.svg"
                  alt="Instagram"
                  className="h-6"
                />
              </a>
              <a href="#" rel="noopener noreferrer">
                <img
                  src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/5f3edfb9bd14edb0979b03f8_icon-twitter-blue.svg"
                  alt="Twitter"
                  className="h-6"
                />
              </a>
              <a href="#" rel="noopener noreferrer">
                <img
                  src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/5f3edf1fcd1f34f55a689236_icon-youtube-pink.svg"
                  alt="YouTube"
                  className="h-6"
                />
              </a>
            </div>
            {/* Instagram Feed - You'll need to implement this separately */}
            <div className="bg-white p-4">
              <p>Instagram feed would go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
