"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar'
import Image from 'next/image'

function Page() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch the projects data from the JSON file
        fetch('/project.json')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching projects:', error));


    }, []);

    const project = projects.find(project => project.id === 'clip-finetune');

    return (
        <div>
            <Navbar />
            {project && (
                <div className='px-8 md:px-16 xl:px-96  my-16'>
                    <h1 className='font-bold text-4xl sm:text-6xl'>{project.title}</h1>
                    <a className='text-red-500 hover:underline hover:underline-offset-4' href={project.github}>Github</a>

                    <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>Introduction</h2>
                    <p>
                        As part of our course work for the project component for the course &quot;Deep Learning&quot; we were tasked to building something interesting from what we have learned during the course that contains any deep learning applications. Instead of looking at the applications directly we started to look at a few datsets on the internet and later decide what the deep learning technique that we will use to  solve or apply the datset to that will produce interseting results. In that process of searching for a dataset we found <a className='text-red-500' href='https://huggingface.co/datasets/Magneto/caption_for_mars_and_rover_image_size_1024'>&quot;Magneto/caption_for_mars_and_rover_image_size_1024&quot;</a>, this dataset consisted of images of the Mars landscape mostly collected from the NASA articles along with a short and large caption that describes the image. We thought that this dataset would be interseting to work with and based on our recent encounter with CLIP like models we decided to use this dataset to train the CLIP Model which will help us in understanding the use of these models in a real world scenario.
                    </p>


                    <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>Method</h2>
                    {/* Step 1 Finetuning the CLIP Model */}
                    <h3 className='font-bold my-6 text-2xl  sm:text-3xl sm:my-8'>Step 1: Finetuning the CLIP Model</h3>
                    <a className='text-red-500 hover:underline hover:underline-offset-4' href={project.github}>Github</a>
                    <p>I begin the project by deciding to finetune a clip model with the dataset that I choose from hugging face. Now I decided after looking up a few articles from medium that I am going to use the clip model from hugging face which has pre-trained weights from openai. The clip model variant that I chose to finetune is the one with the least number of parameters, that is the &quot;openai/clip-vit-base-patch16&quot; model which has ViT-B/16 vision transformer for image encoding and masked self-attention transformer for text encoding. I chose to pre-train this base version to see the performance when compared to a large version &quot;openai/clip-vit-large-patch14&quot; which I finetuned later. </p>
                    I monitored the cosine loss of the model and saved these models through the epochs for using them later. I trained the models on the University of Utah&apos;s CHPC cluster with 1 80GB H100 GPU. The training took around 8 hours for the base model and 10 hours for the large model.
                    <Image
                        src="/proj-images/clip-finetune/training_loss_total_clip-vit-base-patch16.png"
                        alt="clip-vit-base-patch16"
                        width={500}
                        height={500}
                        className='my-5 mx-auto'
                    />
                    <Image
                        src="/proj-images/clip-finetune/training_loss_total_clip-vit-large-patch14.png"
                        alt="clip-vit-large-patch14"
                        width={500}
                        height={500}
                        className='my-5 mx-auto'
                    />

                    {/* Step 2 Creating the FastAPI API */}
                    <h3 className='font-bold my-6 text-2xl  sm:text-3xl sm:my-8'>Step 2 Creating the FastAPI API</h3>
                    <a className='text-red-500 hover:underline hover:underline-offset-4' href="https://github.com/Deekshith-Dade/clip_query">Github</a>
                    <p>Once I have the pre-trained models, the main thing I will need is the embedding functions from the model to encode images and text. Huggingface provided functions that would give me these functions for both image encoder which is of VIT and the text encoder which is a self-attention transformer. These embedding functions will be now useful in 2 cases, once is when we are building the vector database with initial data and second when the user queries the API with either images or text, we will have to convert these into embeddings to compare and get the best results from the vector database which also stores embeddings. </p>

                    <p>I used FastAPI library to build this api which was very fast to learn from the documentation for my use case. I decided to use chromaDB for vector database implementation, which I also decided to use because of it&apos;s ease of use and understanding from documentation. Now I need to have, for my application ,two vector databases one which contains the image embeddings and the other containing text embeddings. For the text corpus, I choose bunch of articles handpicked from NASA&apos;s mars section, then used the langchain API to split the text in the articles to chunks, associating them with the source link in the metadata of that chunk. I then pass the text to the embedding function from the pre-trained model and then save these embeddings along with the metadata in the text database. I also did the same with the images, saving collecting images from articles, converting them into embeddings using the embedding function from the pre-trained model and saving the embeddings along with the source link in the images vector database.</p>

                    <p>The vector database&apos;s are now ready to be queried. Using the FastAPI I create 2 endpoints for queriying using images and querying using text, which then access the different modal data and gets the best k results from the database using cosine similarity of the embeddings. </p>

                    <div className='flex-row'>
                        <Image
                            src="/proj-images/clip-finetune/q-image.png"
                            alt="clip-vit-base-patch16"
                            width={500}
                            height={500}
                            className='my-5 mx-auto'
                        />
                        <Image
                            src="/proj-images/clip-finetune/q-text.png"
                            alt="clip-vit-large-patch14"
                            width={500}
                            height={500}
                            className='my-5 mx-auto'
                        />
                    </div>
                    {/* Step 3 Creating the UI  */}
                    <h3 className='font-bold my-6 text-2xl  sm:text-3xl sm:my-8'>Step 3 Creating the UI</h3>
                    <a className='text-red-500 hover:underline hover:underline-offset-4' href={"https://github.com/Deekshith-Dade/clip_ui"}>Github</a>
                    <p>I created the UI using the NextJS framework which uses these API endpoints to display the results to the user without the need to interacting with the API. The UI has an image upload section which when submitted calls the API endpoint query with images. The API converts the image to the embedding using a pre selected pre-trained model and queries the vector database for similar matches using cosine similarity to bring the best k results from articles, which are then displayed along with the sources. For a text query, similarly the text embeddings are produced and similarity search is performed on the image embeddings vector database to fetch the best k results of similar images which are then displayed on the UI.</p>
                    <Image
                        src="/proj-images/clip-finetune/clip_ui.jpg"
                        alt="clip-vit-base-patch16"
                        width={500}
                        height={500}
                        className='my-5 mx-auto'
                    />

                    <h3 className='font-bold my-6 text-2xl  sm:text-3xl sm:my-8'>Insights</h3>
                    <p>Biggest hassle with this project came in finetuning the clip model. I initially thought finetuning it generally would work but I had to play a lot with the hyperameters to make it work. Specially using a lower learning rate than I thought and only nudging the model&apos; weights seemed the best choice, because the  model is already trained on a large dataset which understands general things like colors, gender, objects etc. but finetuning it made it aware also of terms and visual clues related to mars.  </p>

                    <h3 className='font-bold my-6 text-2xl  sm:text-3xl sm:my-8'>References</h3>
                    <ol className='list-decimal list-inside'>
                        <li>Alec Radford, Jeff Wu, Rewon Child, D. Luan, Dario Amodei,
                            and Ilya Sutskever. Language models are unsupervised multi-
                            task learners, 2019</li>
                        <li>Ting Chen, Simon Kornblith, Mohammad Norouzi, and Geof-
                            frey Hinton. A simple framework for contrastive learning of
                            visual representations, 2020</li>
                        <li>Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov,
                            Dirk Weissenborn, Xiaohua Zhai, Thomas Unterthiner,
                            Mostafa Dehghani, Matthias Minderer, Georg Heigold, Syl-
                            vain Gelly, Jakob Uszkoreit, and Neil Houlsby. An image is
                            worth 16x16 words: Transformers for image recognition at
                            scale, 2021.</li>
                        <li>Kaiming He, Haoqi Fan, Yuxin Wu, Saining Xie, and Ross
                            Girshick. Momentum contrast for unsupervised visual repre-
                            sentation learning, 2020.</li>
                        <li>Mathilde Caron, Hugo Touvron, Ishan Misra, Herv´e J´egou,
                            Julien Mairal, Piotr Bojanowski, and Armand Joulin. Emerg-
                            ing properties in self-supervised vision transformers, 2021</li>
                        <li>Wenwen Yu, Yuliang Liu, Wei Hua, Deqiang Jiang, Bo Ren,
                            and Xiang Bai. Turning a clip model into a scene text detector,
                            2023.</li>
                        <li>Hangbo Bao, Li Dong, Songhao Piao, and Furu Wei. Beit:
                            Bert pre-training of image transformers, 2022.</li>
                        <li>Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya
                            Ramesh, Gabriel Goh, Sandhini Agarwal, Girish Sastry,
                            Amanda Askell, Pamela Mishkin, Jack Clark, Gretchen
                            Krueger, and Ilya Sutskever. Learning transferable vi-
                            sual models from natural language supervision. CoRR,
                            abs/2103.00020, 2021</li>
                    </ol>
                </div>
            )}
        </div>
    )
}

export default Page