import { Configuration, OpenAIApi } from "openai";

/**
 * 4 most important things we need to give it is:
 * 1. Model: Which is the model type we want to use. As of today. text-davinci-003 is the most advanced model.
 * 2. Prompt: This is the prompt we're passing, just like we'd do in Playground. In this case, we pass it basePromptPrefix which is an empty string right now(we will use it later) and req.body.userInput which will be the input that the user enters in the textarea on the frontend that we send to this API function.
 * 3. Temperature: Choose how close we want the result to be close to the "Right answer."
 * 4. Max_tokens: I am setting this to 250 for now which is about 1,000 characters total.  
 */


const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    }),
);

const basePromptPrefix =
    `
You are a smart, talented and ambitious voice assistant named Sammy. Created by Vaibhav. You are designed to help making the research easier on any topic.

Give me in-depth information on the following research topics.

Make sure to follow well defined research processes to give maximum valuable information. The research should be well structured and provide references and fun fact about the topic if there is one.

Topics:

`;

// Can add prompt chaining if possible.
// const basePromptPrefix =
// `
// Write me a detailed table of contents for a blog post with the title below.

// Title:
// `

// const generateAction = async (req, res) => {
//   console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

//   const baseCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${basePromptPrefix}${req.body.userInput}`,
//     temperature: 0.8,
//     max_tokens: 250,
//   });

//   const basePromptOutput = baseCompletion.data.choices.pop();

//   // I build Prompt #2.
//   const secondPrompt = 
//   `
//   Take the table of contents and title of the blog post below and generate a blog post written in thwe style of Paul Graham. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.

//   Title: ${req.body.userInput}

//   Table of Contents: ${basePromptOutput.text}

//   Blog Post:
//   `

//   // I call the OpenAI API a second time with Prompt #2
//   const secondPromptCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${secondPrompt}`,
//     // I set a higher temperature for this one. Up to you!
//     temperature: 0.85,
// 		// I also increase max_tokens.
//     max_tokens: 1250,
//   });

//   // Get the output
//   const secondPromptOutput = secondPromptCompletion.data.choices.pop();

//   // Send over the Prompt #2's output to our UI instead of Prompt #1's.
//   res.status(200).json({ output: secondPromptOutput });
// };

// export default generateAction;
const generateAction = async (req, res) => {
    // Run the first prompt
    const input = `${basePromptPrefix}${req.body.inputPrompt}`
    console.log(`API: ${input}`);

    const baseCompletion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        temperature: 0.7,
        max_tokens: 1250
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    console.log("BasePromptOutput: ", basePromptOutput.text);

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;