import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" text-center py-4 mb-8">
      <p className="mb-2 text-white">
        &copy; 2025 <span className="text-indigo-700">Climate Dashboard</span>.{" "}
        <br /> Developed by <strong>Giacomo Pirani</strong> as a final project
        for{" "}
        <a
          href="https://www.start2impact.it/master/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 font-semibold hover:underline"
        >
          Start2Impact University
        </a>
      </p>
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="https://github.com/giacomopirani"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-primary transition-colors "
        >
          <Github size={24} className="hover:text-indigo-700" />
          <span className="sr-only">GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/giacomo-pirani-914404276/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-primary transition-colors"
        >
          <Linkedin size={24} className=" hover:text-indigo-700" />
          <span className="sr-only">LinkedIn</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
