import "./_privacy.css";
import React from "react";

export const PrivacyBot = () => {
    return (
        <div className="privacy">
            <div className="privacy-section">
                <h1><b>Bouns'Bot</b> Privacy Policy</h1>
            </div>


            <div className="privacy-section">
                <p className="last-update">
                    <strong>Last update</strong>: 1 octobre 2022
                </p>
                <p>
                    This privacy policy applies to the Discord bot <b>Bouns'Bot#8778</b>.
                </p>

                <p><b>Bouns'bot</b> is a French bot that aims to <b>improve your experience</b> in your discord, to complete this project, we need to collect some personal data.</p>
                <h2>Why we collect data</h2>
                <p>
                    We collect data for the sole purpose of providing you with a <b>quality service</b>.
                </p>

                <h2>The data we collect</h2>
                <p>
                    <b>Bouns'bot</b> collects only the data essential to its proper functioning, here are the details of these data:
                </p>
                <section>
                    <h5>The data on your discord server</h5>
                    <p>
                        <b>Bouns'bot</b> needs to collect some data on the discord server to be able to work, these data are :
                    </p>
                    <ul>
                        <li>The server ID</li>
                        <li>The configuration of <b>Bouns'bot</b> within the server:<br />
                            - Activated commands<br />
                            - The channels where the logs are retransmitted<br />
                            - The roles obtainable according to the levels that members can receive<br />
                            - Banned words within the server, to be able to delete them.<br />
                        </li>

                        <li>The data of the members of the discord server:<br />
                            - Member's username<br />
                            - The member's ID<br />
                            - The number of messages from the member<br />
                            - The number of xp obtained by the member<br />
                            - The link of his avatar<br />
                        </li>
                    </ul>
                </section>
                <section>
                    <h5>Your discord account data</h5>
                    <p>
                        <b>Bouns'bot</b> needs to collect some data on the discord account so that it knows who you are, to be able to provide you with an optimized and quality service according to the user, these data are the following:
                    </p>
                    <ul>
                        <li>Your discord account ID</li>
                        <li>The nickname of your discord account</li>
                        <li>The link of your discord avatar</li>
                        <li>The different achievements that the user has obtained</li>
                        <li>Information on whether or not the user agrees to the collection of their data</li>
                    </ul>
                </section>

                <h2>How the data is used</h2>
                <p>
                    The data is used to provide you with a quality service, here are the different cases of data use:
                </p>
                <section>
                    <h5>The data on your discord server</h5>
                    <p>
                        The data of your discord server are used to provide you a quality service. We use the data collected for the sole purpose of having the configuration of <b>Bouns'bot</b> within your discord server, but also the xp and the number of messages of the members to be able to provide you roles according to the levels that the members can have but also to display the rankings of the members within your discord server.
                    </p>
                </section>
                <section>
                    <h5>Your discord account data</h5>
                    <p>
                        The data from your discord account is used for the sole purpose of providing you with a quality service, we use the data collected to display in a leaderboard the most active members globally, but also to provide you with achievements based on your actions on the bot.
                    </p>
                </section>

                <h2>How data is shared</h2>
                <p>
                    <b>NO data stored</b> is shared with third parties, they are exclusive to the use of <b>Bouns'bot</b>. The data are stored on a private server, and are accessible only by the developers of <b>Bouns'bot</b>.
                </p>

                <h2>How to contact us</h2>
                <p>
                    The <b>Bouns'bot</b> team wants to be transparent with the use of your data, that's why we put in place many ways for you to contact us, here are the different ways to contact us:
                </p>
                <section>
                    <h5>Discord</h5>
                    <p>
                        You can contact us on our discord server, for that you just have to join the server of <b>Bouns'bot</b> by clicking on the button below:
                    </p>
                    <a href="https://discord.gg/8QZ7Y4K" target="_blank" rel="noopener noreferrer">
                        <button className="btn btn-primary linkButton">Join the discord server</button>
                    </a>
                </section>
                <section>
                    <h5>Mail</h5>
                    <p>
                        You can contact us by mail, for that you just have to send it to the following address
                    </p>
                    <a href="mailto:bounoirfabien@gmail.com">
                        <button className="btn btn-primary linkButton">Send an email</button>
                    </a>
                </section>
                <section>
                    <h5>Directly with the bot</h5>
                    <p>
                        You can contact us directly with the bot, for that you just have to make the command
                        <code>/report</code><br />
                        A private message will be sent to the <b>Bouns'bot</b> team, you will receive an answer as soon as possible in private message.
                    </p>
                </section>

                <h2>How to delete your data</h2>
                <p>
                    <b>Bouns'bot</b> was created with the sole purpose of improving your experience on discord, and we do not want your data to be misused, that's why we put in place several ways to view your data collected, as well as to delete them if you wish.
                </p>
                <section>
                    <h5>Delete your data</h5>
                    <p>
                        You can delete your data by doing the command <code>/data delete</code> on a discord server, or by private message with the bot, the deletion of your data is final, and cannot be undone.
                    </p>
                    <p>
                        You can also delete your data by contacting us by mail or on our discord server, we will delete them as soon as possible.
                    </p>
                    <p>
                        You can also send a message to support with the <code>/report</code> command to delete your data, you will then receive a reply via private message.
                    </p>
                </section>
                <section>
                    <h5>Visualize your data</h5>
                    <p>
                        You can view your data by doing the <code>/data get</code> command on a discord server, or in a private message with the bot, using this command will send you a file containing all your data.
                    </p>
                </section>
                <section>
                    <h5>Opting out of your data collection</h5>
                    <p>
                        You can at any time disable the collection of your data by making the command <code>/data collection:false</code> on a discord server, or in private message with the bot, the use of this command disables the collection of your data, this will result in no longer being able to use some features of <b>Bouns'bot</b>.
                    </p>
                    <p>
                        You can also deactivate the collection of your data by contacting us by mail or on our discord server, we will deactivate the collection of your data as soon as possible.
                    </p>
                    <p>
                        You also have the option to send a message to support with the command <code>/report</code> to disable the collection of your data, you will then receive a reply by private message as soon as this operation is performed.
                    </p>
                </section>
                <p>
                    Also see <a href="https://discord.com/privacy">Discord’s Privacy Policy.</a>
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