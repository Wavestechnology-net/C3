import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";

const tryoutSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  dob: Yup.date().required("Date of birth is required"),
  age: Yup.number().required("Age is required").min(1, "Invalid age"),
  gender: Yup.string().required("Gender is required"),

  parentName: Yup.string().required("Parent/Guardian name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),

  programs: Yup.array().min(1, "Select at least one program"),

  experience: Yup.string().required("Experience selection is required"),
  previousTeams: Yup.string().when("experience", {
    is: "Yes",
    then: (schema) => schema.required("Please list previous teams"),
    otherwise: (schema) => schema.optional(),
  }),

  medicalInfo: Yup.string().optional(),
  emergencyContact: Yup.string().required("Emergency contact is required"),

  consent: Yup.boolean().oneOf([true], "Consent is required"),
  signature: Yup.string().required("Signature is required"),
  signatureDate: Yup.date().required("Date is required"),
});

const Tryouts = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tryoutSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const experience = watch("experience");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://c3-email-service.server.dizainstech.com/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (result.success) {
        toast.success("Email sent successfully.");
        reset();
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Email error:", error);
      toast.error("An error occurred while sending the email.");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-white px-6 py-20">
      <div className="flex justify-center mt-27">
        <div className="h-2 w-230 bg-[#DADF36]"></div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mt-10">
        C3FC Soccer Club Tryout Registration
      </h1>{" "}
      <div className="flex justify-center mt-10">
        <div className="h-2 w-230 bg-[#DADF36]"></div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto space-y-8 my-10"
      >
        {/* 1. Player Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">1. Player Information</h2>
          <input
            {...register("fullName")}
            placeholder="Full Name"
            className="w-full border p-2"
          />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>

          <input
            type="date"
            {...register("dob")}
            className="w-full border p-2 mt-2"
          />
          <p className="text-red-500 text-sm">{errors.dob?.message}</p>

          <input
            type="number"
            {...register("age")}
            placeholder="Age"
            className="w-full border p-2 mt-2"
          />
          <p className="text-red-500 text-sm">{errors.age?.message}</p>

          <div className="flex gap-4 mt-2">
            <label>
              <input type="radio" value="Male" {...register("gender")} /> Male
            </label>
            <label>
              <input type="radio" value="Female" {...register("gender")} />{" "}
              Female
            </label>
            <label>
              <input type="radio" value="Other" {...register("gender")} /> Other
              / Prefer not to say
            </label>
          </div>
          <p className="text-red-500 text-sm">{errors.gender?.message}</p>
        </div>

        {/* 2. Parent Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            2. Parent/Guardian Information
          </h2>
          <input
            {...register("parentName")}
            placeholder="Name"
            className="w-full border p-2"
          />
          <p className="text-red-500 text-sm">{errors.parentName?.message}</p>

          <input
            {...register("phone")}
            placeholder="Phone Number"
            className="w-full border p-2 mt-2"
          />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>

          <input
            {...register("email")}
            placeholder="Email Address"
            className="w-full border p-2 mt-2"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        {/* 3. Program Selection */}
        <div>
          <h2 className="text-xl font-semibold mb-4">3. Program Selection</h2>
          <label>
            <input
              type="checkbox"
              value="Youth Academy (Ages 6–12)"
              {...register("programs")}
            />{" "}
            Youth Academy (Ages 6–12)
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Youth Competitive (Ages 12–18)"
              {...register("programs")}
            />{" "}
            Youth Competitive (Ages 12–18)
          </label>
          <p className="text-red-500 text-sm">{errors.programs?.message}</p>
        </div>

        {/* 4. Experience */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            4. Previous Soccer Experience
          </h2>
          <label>
            <input type="radio" value="Yes" {...register("experience")} /> Yes
          </label>
          <label className="ml-4">
            <input type="radio" value="No" {...register("experience")} /> No
          </label>
          <p className="text-red-500 text-sm">{errors.experience?.message}</p>

          {experience === "Yes" && (
            <>
              <textarea
                {...register("previousTeams")}
                className="w-full border p-2 mt-2"
                placeholder="List previous clubs or teams"
              ></textarea>
              <p className="text-red-500 text-sm">
                {errors.previousTeams?.message}
              </p>
            </>
          )}
        </div>

        {/* 5. Medical Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">5. Medical Information</h2>
          <textarea
            {...register("medicalInfo")}
            placeholder="Allergies or medical conditions"
            className="w-full border p-2"
          ></textarea>
          <input
            {...register("emergencyContact")}
            placeholder="Emergency Contact Name & Phone"
            className="w-full border p-2 mt-2"
          />
          <p className="text-red-500 text-sm">
            {errors.emergencyContact?.message}
          </p>
        </div>

        {/* 6. Consent */}
        <div>
          <h2 className="text-xl font-semibold mb-4">6. Consent</h2>
          <label>
            <input type="checkbox" {...register("consent")} className="mr-2" />I
            consent to my child’s participation and acknowledge the club’s
            policies.
          </label>
          <p className="text-red-500 text-sm">{errors.consent?.message}</p>
        </div>

        {/* 7. Signature */}
        <div>
          <h2 className="text-xl font-semibold mb-4">7. Signature</h2>
          <input
            {...register("signature")}
            placeholder="Parent/Guardian Signature"
            className="w-full border p-2"
          />
          <p className="text-red-500 text-sm">{errors.signature?.message}</p>

          <input
            type="date"
            {...register("signatureDate")}
            className="w-full border p-2 mt-2"
          />
          <p className="text-red-500 text-sm">
            {errors.signatureDate?.message}
          </p>
        </div>

        <div className="pt-6 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-[#DADF36] text-black font-semibold px-6 py-2 rounded transition cursor-pointer ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-yellow-400"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Registration"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tryouts;
