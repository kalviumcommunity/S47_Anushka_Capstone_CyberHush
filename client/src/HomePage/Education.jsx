import React from "react";
import "./Education.css";
import { Link } from "react-router-dom";

const topics = [
  {
    id: 1,
    title: "Assassination",
    description: "Assassination means intentionally killing someone, often by surprise or with careful planning, especially if the person is well-known or significant."
  },
  {
    id: 2,
    title: "Blackmail",
    description: "When someone threatens to harm someone else into doing something they want, either for their own benefit or someone else's, with the intention of causing harm or loss to the victim."
  },
  {
    id:3,
    title:"Child Abuse",
    description: " behavior or neglect toward a child, including physical, sexual,emotional, or psychological mistreatment, usually by a parent or caregiver."
  },
  {
    id:4,
    title:"Child Pornography", 
    description:"Child pornography is any material that shows minors (people under 18) in sexual situations, whether it's made, shared, or shown in real life or in a pretend way."
  },
  {
    id:5,
    title:"Cybercrime",
    description:"Cybercrime includes various illegal activities done using computers or the internet. These include fraud, stealing personal information,spreading viruses, and other harmful acts. Cyber criminals find weaknesses in computer systems to access data, disrupt services, and cause harm to people, businesses, and governments."
  },
  {
    id:6,
    title:"Domestic Violence",
    description:"Domestic abuse, also known as domestic violence or intimate partner violence, is when one person in a relationship uses behaviors to control  or gain power over their partner. These behaviors can be physical,  sexual, emotional, economic, or psychological."
  },
  {
    id:7,
    title:"Forced Labor",
    description:"Forced labor means making people work against their will, either by using violence or threats, or through subtler methods like trapping them  in debt, keeping their identification papers, or threatening to report them to immigration authorities. "
  },
  {
    id:8,
    title:"Identity Theft",
    description:"Identity theft happens when someone tricks you into giving away personal information, then uses it to pretend to be you and do things in your name, like spending money or opening accounts."
  },
  {
    id:9,
    title:"Insurance Fraud",
    description:" Insurance fraud happens when someone tries to cheat the insurance system. This could involve lying to get money or benefits they shouldn't receive, or when an insurance company unfairly refuses to provide rightful benefits."
  },
  {
    id:10,
    title:"Molestation",
    description:"  Molestation is the crime of engaging in sexual acts with minors, including touching of private parts, exposure of genitalia, taking of pornographic pictures, rape, inducement of sexual acts with the molester or with other children, and variations of these acts."
  },
  {
    id:11,
    title:"Prostitution",
    description:" Prostitution is when someone offers sexual services in exchange for money or other valuables. This can involve any gender and any sexual orientation."
  },
  {
    id:12,
    title:"Racketeering",
    description:" Racketeering involves a group of people working together to make money through illegal activities that might look like normal business deals. They do this by cheating, threatening, using violence, or other illegal methods to make a profit."
  },
  {
    id:13,
    title:"Ransomware",
    description:" Ransomware is a harmful computer program that can lock you out of your own files or computer until you pay money to the person who created it."
  },
  {
    id:14,
    title:"Rape",
    description:"Rape is a form of sexual assault where someone forces another person to engage in sexual activity without their agreement. This can happen through physical force, threats, manipulation, or taking advantage of someone who is unable to give consent, like someone who is unconscious, intoxicated, underage, or has a disability."
  },
  {
    id:15,
    title:"Robbery",
    description:" Robbery is when someone forcefully takes something valuable from another person. This can be done by threatening them or making them feel afraid. Basically, it's stealing through force or intimidation."
  },
  {
    id:16,
    title:"Sex Trafficking",
    description:" Sex trafficking is a type of human trafficking where individuals are forced into sexual activities against their will. Victims, often  referred to as sex workers, are coerced by traffickers, also known as pimps, who use manipulation and threats to make them engage in sexual acts for money."
  },
  {
    id:17,
    title:"Shoplifting",
    description:" Shoplifting is when someone takes items from a store without paying for them. This often involves hiding the items on themselves or with someone else and leaving the store without paying."
  },
  {
    id:18,
    title:"Stalking",
    description:" Stalking is when someone keeps unwantedly watching or bothering another  person, like following them around or keeping track of what they're doing. It's like harassment and intimidation rolled into one, where the person being stalked feels constantly watched or pursued."
  },
  {
    id:19,
    title:"Torture",
    description:" Torture means purposefully causing intense pain or suffering to someone, whether to punish them, force them to confess, get information through questioning, orcitation."
  },
  {
    id:20,
    title:"Trespassing",
    description:" Trespassing means going onto someone else's property without permission, either to do something illegal, or tocitation, insult, or bother the person who owns the property."
  },
  {
    id:21,
    title:"Vandalism",
    description:"Vandalism is when someone deliberately damages or ruins someone else's property. It's a problem that impacts both the owners of the property and the community as a whole."
  }
];

function Education() {
    return (
      <>
      <header className="navbar">
        <div className="logo">Logo</div>
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/report">Report</Link>
          <Link to="/education">Education</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/feedback">FeedBack</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </header>
      <div className="main">
        {topics.map((topic, index) => (
          <div key={topic.id}>
            <h1>{`${index + 1}. ${topic.title}`}</h1>
            <p>{topic.description}</p>
          </div>
        ))}
      </div>
      </>
    );
  }

export default Education