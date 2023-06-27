import React from "react";

function AboutPage(props) {
  return (
    <main className="flex h-full flex-col justify-between overflow-scroll p-4 md:font-medium lg:p-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold">About</h2>
        <p className="">
          NUSNomNom was made to help my friends and I decide{" "}
          <span className="font-bold text-[#d3a335]">
            what to eat for lunch{" "}
          </span>
          faster, before we become too lazy and starve ourselves.
          <br />
          It was a side project to let me practise some designing and
          programming skills. Hopefully NUSNomNom will be useful to some others
          as well!
        </p>
        <br />
        <p>
          This page is <span className="underline">not</span> officially
          affiliated with or linked to NUS in any way, and most of the data is
          manually gathered and managed.
          <br />
          Therefore, there might be inaccuracies and out-of-date information.
          Much apologies for any inconveniences! &#x1F64F;
        </p>
        <br />
        <p>
          <h2 className="mb-2 text-2xl font-bold">Attributions</h2>
          <span>
            Several vectors and icons by{" "}
            <a
              href="https://www.svgrepo.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#d3a335] underline"
            >
              SVG Repo
            </a>
            .
            <br />
            Map was created using LeafletJS, an open-source JavaScript library
            for interactive maps.
            <br />
            <br />
            Information sourced from NUS Campus Life pages and from my own
            campus adventures.
            <br />
            <br />
            Map design and other icons by me.
          </span>
          <span></span>
        </p>
        <br />
      </div>
      <div>
        <hr className="border-[#d3a335]" />
        <span className="italic">
          Dining options information last updated: 28/06/2023
        </span>
      </div>
    </main>
  );
}

export default AboutPage;
