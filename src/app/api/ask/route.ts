import { OpenAI } from 'openai';

export async function POST(request: Request) {
    const { question } = await request.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });

    const thread = await openai.beta.threads.create();
    const message = await openai.beta.threads.messages.create(
        thread.id,
        {
            role: 'user',
            content: question
        }
    );

    let run = await openai.beta.threads.runs.createAndPoll(
        thread.id,
        {
            assistant_id: process.env.OPENAI_ASSISTANT_ID as string,
        }
    );

    if (run.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(
            run.thread_id
        );

        let response = (messages.data[0].content[0] as any).text.value;
        const annotations = messages.data.map((d: any) => d.content[0].text.annotations).flat();

        for (const annotation of annotations) {
            const file = await openai.files.retrieve(annotation.file_citation.file_id);
            const page = file.filename.split('Competition-Manual_Part')[1].split('.')[0];
            response = response.replace(
                annotation.text,
                ` [[${page}]](#${page})`
            );
        }
        
        return new Response(
            JSON.stringify({
                answer: response
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}