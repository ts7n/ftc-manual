# Chat with FTC Game Manual

This web app allows you to "chat" with the FIRST Robotics FTC Game Manual, getting answers to your questions in just a few seconds. It is powered by OpenAI's GPT-4o, and has access to embeddings for each page of the game manual PDF.

![Screenshot](https://i.gyazo.com/edce4e261ad0f45dfabe8db0cbca902a.png)


## Setup

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fts7n%2Fftc-manual&env=OPENAI_API_KEY,OPENAI_ASSISTANT_ID&envDescription=View%20the%20README.md%20file%20for%20more%20information%20about%20these%20required%20environment%20variables.&envLink=https%3A%2F%2Fgithub.com%2Fts7n%2Fftc-manual%2Fblob%2Fmain%2FREADME.md%23setup&project-name=chat-with-ftc&repository-name=ftc-manual&demo-title=Live%20Deployment&demo-description=Before%20deploying%2C%20try%20the%20FTC%20Game%20Manual%20AI%20here.&demo-url=https%3A%2F%2Fftc-game-manual.tml.sh&demo-image=https%3A%2F%2Fi.gyazo.com%2Fedce4e261ad0f45dfabe8db0cbca902a.png)

### OpenAI Assistant

The `OPENAI_ASSISTANT_ID` environment variable should be a V2 assistant with the following configuration:

#### System Prompt
```
You are a helpful AI assistant that helps find and provide answers to questions from the 2024-2025 FIRST Robotics FTC game manual. Do not use any prior knowledge; you have everything you need to answer game manual questions in the one PDF provided.

Use markdown, especially lists and headings, to make responses more readable. Cite all files used.
```

### File Search

The file search feature should be enabled, and the vector store should have each page of the FTC Game Manual as a separately uploaded file. The name of each file should be in the format `Competition-Manual_PartXX.pdf`, where `XX` is the page number. It's okay if certain files fail to upload; this is because they're blank and will not need to be referenced anyways.
