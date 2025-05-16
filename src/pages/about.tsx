import Image from "next/image";
import Link from "next/link";

export default function Over() {
  return (
    <>
      <div className="min-h-screen  flex flex-col items-center py-16 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full border-2 border-[#00b455]">
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/me.jpg"
              alt="Jouw naam"
              width={120}
              height={120}
              className="rounded-full mb-4 border-4 border-[#00b455]"
            />
            <h1 className="text-3xl font-bold mb-1 text-[#00b455]">
              Noa Van den Berghe
            </h1>
            <p className="text-gray-600 mb-3">
              Stagiair bij{" "}
              <Link
                href="https://www.deme-group.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00b455] font-semibold underline hover:text-[#008c3a] transition-colors"
              >
                DEME
              </Link>
            </p>
            <div className="flex gap-4 mb-2">
              <Link
                href="https://www.linkedin.com/in/noa-van-den-berghe/"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg shadow hover:bg-[#004182] transition-colors font-semibold"
                rel="noopener noreferrer"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.603 2.003 3.603 4.605v5.591z" />
                </svg>
                LinkedIn
              </Link>
              <Link
                href="https://github.com/NoaBrecht"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition-colors font-semibold"
                rel="noopener noreferrer"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </Link>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-[#00b455]">
              Over de Stage & DEME
            </h2>
            <p className="text-gray-700 mb-2">
              Ik loop stage bij <strong className="text-[#00b455]">DEME</strong>
              , gevestigd in Zwijndrecht.{" "}
              <strong className="text-[#00b455]">DEME</strong> is een
              toonaangevend bedrijf in de maritieme sector, gespecialiseerd in
              baggerwerken, offshore energie en milieuprojecten.
            </p>
            {/* //! WRITE A TEXT ABOUT STAGE */}
            <p className="text-gray-700"></p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#00b455]">
              Mini CV
            </h2>
            <ul className="list-disc list-inside text-gray-700 marker:text-[#00b455]">
              <li>
                <strong className="text-[#00b455]">Opleiding:</strong>{" "}
                Associate's degree, Programmeren
              </li>
              <li>
                <strong className="text-[#00b455]">Vaardigheden:</strong> HTML,
                CSS, JavaScript, React, SQL, Blazor ...
              </li>
              <li>
                <strong className="text-[#00b455]">Ervaring:</strong> Internship
                bij gemeente Brecht, Internship bij{" "}
                <strong className="text-[#00b455]">DEME</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
