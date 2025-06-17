import { Button } from "../components/ui/button";

export default function ContactUs() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Contact Us</h1>

      <p className="text-gray-700 text-center">
        You’ve got questions—we’ve got answers. If you can't find what you're looking for above,
        fill out the form below and we’ll get back to you within 48 hours. All fields are required.
      </p>

      <form className="space-y-6">
        {/* Program of Interest */}
        <div>
          <label className="block mb-2 font-medium">Program of Interest</label>
          <select
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          >
            {["Recreational", "Youth Academy", "Competitive", "Elite", "Camps", "Unsure"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Preferred Training Location */}
        <div>
          <label className="block mb-2 font-medium">Preferred Training Location</label>
          <select
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          >
            {[
              "Central Campus (West University Place, Bellaire & River Oaks)",
              "Southwest Campus (Sugar Land & Missouri City)",
            ].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Parent Info */}
        {["Parent First Name", "Parent Last Name", "Phone Number", "Email Address"].map((lbl, idx) => (
          <div key={idx}>
            <label className="block mb-2 font-medium">{lbl}</label>
            <input
              type={lbl === "Email Address" ? "email" : lbl.includes("Phone") ? "tel" : "text"}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
        ))}

        {/* Player Info */}
        {["Player First Name", "Player Last Name", "Player Birth Date (MM/DD/YYYY)", "Zip Code"].map((lbl, idx) => (
          <div key={idx}>
            <label className="block mb-2 font-medium">{lbl}</label>
            <input
              type={lbl.includes("Birth Date") ? "date" : "text"}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
        ))}

        {/* Message */}
        <div>
          <label className="block mb-2 font-medium">Message</label>
          <textarea
            required
            rows={4}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}