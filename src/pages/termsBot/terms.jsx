import "./_terms.css";
import React from "react";
import { Link } from "react-router-dom"

export const TermsBot = () => {
    return (
        <div className="terms">
            <div className="terms-section">
                <h1><b>Bouns'Bot</b> Terms of Service</h1>
            </div>
            <div className="terms-section">
                <p className="last-update">
                    <strong>Effective</strong> october 1, 2022
                </p>
                <p>
                    This Terms of Service applies to the Discord bot <b>Bouns'Bot#8778</b>.
                </p>
                <p>
                    Welcome to Bouns'bot. Please read on to learn the rules and restrictions that govern your use of our proprietary bots. If you have any questions, comments, or concerns regarding these terms or the Services, please contact us at our Discord support server.
                </p>
                <p>
                    These Terms of Use (the “Terms”) are a binding contract between you and Earth. (“Earth,” “we” and “us”).
                    Your use of the Services in any way means that you agree to all of these Terms, and these Terms will remain in effect while you use the Services. These Terms include the provisions in this document as well as those in the Privacy Policy and Copyright Dispute Policy.
                </p>
                <p>
                    You may not use Bouns'bot to violate any applicable laws or regulations, Discord’s Terms of Service, or Discord Community Guidelines. You also may not use Bouns'bot to harm anyone or anything.
                </p>
                <p>
                    When using bot commands that use external services, additional terms may apply to you.Here are ToSes that apply to certain commands: Genius, Twitch, Topgg, Google. Do not use Bouns'bot to violate the terms of any service.
                </p>

                <h2>What about my privacy?</h2>
                <p>
                    We collect data for the sole purpose of providing you with a <b>quality service</b>.
                </p>
                <p>
                    Bouns'bot takes the privacy of its users very seriously. For the current Privacy Policy, please <Link to="/bot/privacy">click here</Link>.
                </p>

                <section>
                    <h5>
                        Children’s Online Privacy Protection Act (COPPA)
                    </h5>

                    <p>
                        Bouns'bot does not knowingly collect any personal information from children under the age of 13. If you are under the age of 13, please do not submit any personal information through Bouns'bot. We encourage parents and legal guardians to monitor their children’s Internet usage and to help enforce this Policy by instructing their children never to provide personal information through Bouns'bot without their permission. If you have reason to believe that a child under the age of 13 has provided personal information to Bouns'bot through its Services, please contact us, and we will endeavor to delete that information from our databases.
                    </p>
                </section>

                <h2>
                    What are the basics of using Bouns'bot?
                </h2>
                <p>
                    You may need to access certain parts or features of the Services (e.g. our proprietary bots) by using your account credentials and password from other services (“Third Party Account”), such as those offered by Discord. By using the Services through a Third Party Account, you permit us to access certain information from such account for use by the Services. You are ultimately in control of how much information is accessible to us and may exercise such control by adjusting your privacy settings on your Third Party Account. We store your account credentials but will not store your password. You promise to provide us with accurate, complete, and updated registration information about yourself. You may not use any Third Party Account that you do not have the right to use, or another person’s account credentials without authorization from that other person. You may not transfer your account to anyone else without our prior written permission.
                </p>
                <p>
                    You represent and warrant that you are an individual of legal age to form a binding contract (or if not, you’ve received your parent’s or guardian’s permission to use the Services and have gotten your parent or guardian to agree to these Terms on your behalf). If you’re agreeing to these Terms on behalf of an organization or entity, you represent and warrant that you are authorized to agree to these Terms on that organization’s or entity’s behalf and bind them to these Terms (in which case, the references to “you” and “your” in these Terms, except for in this sentence, refer to that organization or entity).
                </p>
                <section>
                    <h5>
                        You may not use the Services to do any of the following:
                    </h5>
                    <ul>
                        <li>
                            Use the Services in any way that violates any applicable federal, state, local, or international law or regulation.
                        </li>
                        <li>
                            Use the Services in any way that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another’s privacy, hateful, or racially, ethnically, or otherwise objectionable.
                        </li>
                        <li>
                            Use the Services to impersonate any person or entity, including any of our employees or representatives.
                        </li>
                        <li>
                            Use the Services to engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of the Services, or which, as determined by us, may harm or offend us or users of the Services or expose them to liability.
                        </li>
                    </ul>
                </section>

                <h2>
                    Changes to the Terms
                </h2>

                <p>
                    We may revise these Terms from time to time. The most current version of the Terms will supersede all previous versions. Bouns'bot encourages you to periodically review these Terms to stay informed of our updates.
                </p>

                <div className="signature">
                    <p>
                        <b>Thanks for using Bouns'bot!</b>
                    </p>
                </div>



            </div>


        </div>
    );
};