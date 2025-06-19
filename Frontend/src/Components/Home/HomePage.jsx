import FormComponent from "./FromComponent"
import {
  Code,
  ChatCenteredText,
  UploadSimple,
  DownloadSimple,
  PaintBrush,
  TextAa,
  UserPlus,
  TextT,
  CodeSimple,
} from "@phosphor-icons/react";

function HomePage() {
  const features = [
    {
      icon: <Code size={32} weight="bold" />,
      title: "Real-time Code Editor",
      description: "Collaborate on code live with your team in real-time.",
    },
    {
      icon: <ChatCenteredText size={32} weight="bold" />,
      title: "Live Chat",
      description: "Instantly communicate with collaborators via built-in chat.",
    },
    {
      icon: <UserPlus size={32} weight="bold" />,
      title: "Invite Friends",
      description: "Share room link and invite friends to join your session.",
    },
    {
      icon: <UploadSimple size={32} weight="bold" />,
      title: "Upload Files",
      description: "Easily upload and manage files during the session.",
    },
    {
      icon: <DownloadSimple size={32} weight="bold" />,
      title: "Download Code",
      description: "Download your code anytime with one click.",
    },
    {
      icon: <PaintBrush size={32} weight="bold" />,
      title: "Multiple Themes",
      description: "Switch between light and dark themes effortlessly.",
    },
    {
      icon: <TextAa size={32} weight="bold" />,
      title: "Font Customization",
      description: "Customize your coding experience with adjustable fonts and sizes.",
    },
    {
      icon: <CodeSimple size={32} weight="bold" />,
      title: "Language Selection",
      description: "Select your favorite language to code in.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0e1117] text-gray-100 font-sans px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#00BCD4]">
          Join CodeWithUs
        </h1>
        <p className="mt-2 text-gray-400 text-lg">
          Collaborate, Code, and Chat in Real-Time
        </p>
      </div>
      <div className="flex justify-center mb-20">
        <div className="w-full max-w-xl bg-[#1a1f2e] p-8 rounded-2xl shadow-lg">
          <FormComponent />
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-[#1f2937] hover:bg-[#273349] transition-all duration-300">
              <div className="mb-4 text-[#00BCD4]">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white text-center mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HomePage;
