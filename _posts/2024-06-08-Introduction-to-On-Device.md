---
layout: post
mathjax: true
title:  "An Introduction to On-Device AI"
date:   2024-06-08 08:00:00
author: A.Mootoovaloo
permalink:
categories:
  - Machine Learning and Statistics
tags:
  -
  -
excerpt:
description: "Running AI on phones and edge devices: compilation and quantisation."
---

<p align="justify">This is a short summary of the course <a href="https://learn.deeplearning.ai/courses/introduction-to-on-device-ai/lesson/1/introduction"><strong>Introduction to on-device AI</strong></a> provided by DeepLearning.ai.</p>

<section>
    <h1>Introduction</h1>
    <p align="justify">Modern smartphones, with their significant computational power of 10 to 30 teraflops, can run multiple AI models simultaneously for applications like real-time semantic segmentation and scene understanding. This course explores creating AI applications that run on-device, applicable to smartphones and billions of other devices such as cameras, robots, drones, and VR headsets. Despite differences in hardware and operating systems, the principles for deploying on-device AI are similar. First, models trained in the cloud must be converted into a compatible format, which involves freezing the model into a neural network graph and converting it into an executable format for the target device.</p>
    <p align="justify">Devices like smartphones and edge devices usually contain a mix of CPUs, GPUs, and NPUs, enabling performance optimizations tailored to specific hardware. Understanding the target devices can significantly enhance performance, making applications run up to ten times faster. The course also covers tools for ensuring consistent model performance across devices, which is crucial given the diversity of more than 300 smartphone types. Validating numerical correctness prevents discrepancies in model behaviour caused by hardware differences. Quantization, which reduces the numerical precision of the model's calculations, is another important aspect: it can make apps run several times faster while reducing model size and memory footprint.</p>
</section>

<section>
    <h1>Why On-Device</h1>
    <p align="justify">On-device AI offers several benefits, including reduced latency, improved efficiency, lower costs, and enhanced privacy. Applications of on-device AI are prevalent in real-world scenarios such as real-time speech detection, semantic segmentation, object detection, and physical activity detection. Each time you take a picture with your smartphone, over 20 AI models work in tandem to optimize the image within milliseconds. The industrial IoT sector alone sees an estimated economic impact of around $3 trillion due to these technologies.</p>
    <p align="justify">On-device AI is integrated into many everyday technologies. For instance, typing on a laptop keyboard or interacting with a smart speaker relies on AI running locally. Robots for delivery and assembly, as well as drones used in industrial and agricultural settings, utilize on-device AI. This technology is also pivotal in advanced driver assistance systems in cars and in editing photos on smartphones and laptops. Various applications across audio, image, video, and sensor data—like text-to-speech, speech recognition, photo classification, and physical activity detection—demonstrate the versatility of on-device AI. Running models on-device is advantageous for several reasons:</p>
    <ul>
        <li>It is cost-effective as it leverages local computational resources, thereby eliminating the need for cloud services.</li>
        <li>It is more efficient, as data are processed locally, avoiding the delays associated with cloud communication.</li>
        <li>Privacy is enhanced since data remains on the device.</li>
        <li>It enables personalization, as models can be tailored locally without external data.</li>
    </ul>
</section>

<section>
    <h1>Deploying Segmentation Models On-Device</h1>
    <p align="justify">On-device AI has a wide range of applications, including real-time object detection to identify people, faces, and QR codes; speech recognition to convert spoken input into text; and pose estimation to predict human poses from real-time images or video streams. Other applications include image generation from text descriptions, super-resolution to enhance low-resolution images, and image segmentation, which divides an image into meaningful segments for easier analysis and object identification.</p>
    <p align="justify">Image segmentation comes in various forms, with the most popular being semantic segmentation and instance segmentation.</p>
    <ul>
        <li>Semantic segmentation labels every pixel according to a specific class.</li>
        <li>Instance segmentation labels each pixel by class and individual instance within the same category.</li>
    </ul>
    <p align="justify">The latter is widely used in advanced driver assistance systems to differentiate roads from pedestrians, in image editing software to apply filters or blur backgrounds, and in video conferencing to blur backgrounds during calls. It is also employed in drones for mapping landscapes in agricultural and industrial settings.</p>
    <p align="justify">Several models are used for semantic segmentation, including ResNet, which employs residual connections for training deep networks, and HRNet, which captures fine-grained details through high-resolution representations. FANet, or Feature Agglomeration Network, aggregates features from different scales for detailed predictions, while DDRNet, or Dual Dynamic Resolution Network, balances efficiency and accuracy with a dual-path architecture.</p>
    <p align="justify">The course focuses on FFNET, or Fuss Free Network, which features a simple encoder-decoder architecture with a ResNet-like backbone and a small multi-scale head. FFNET offers comparable accuracy to more complex networks like HRNet and FANet, but with greater computational efficiency, making it ideal for on-device deployment. Its configurable design supports a range of encoder and decoder sizes to suit different deployment environments and accuracy requirements.</p>
</section>

<section>
    <h1>Preparing for On-Device Deployment</h1>
    <p align="justify">The first step is neural network graph capture, which involves capturing the computation to be executed on the device. The second step is on-device compilation. The third step focuses on accelerating models using the device's hardware. The fourth step emphasizes validating the numerical correctness of the model on the device.</p>
    <p align="justify">There are three popular runtimes for on-device deployment: TensorFlow Lite, recommended for Android applications; ONNX Runtime, suitable for Windows-based applications; and the Qualcomm AI Engine, ideal for fully embedded applications on Qualcomm hardware.</p>
    <p align="justify">We now look at the TensorFlow Lite runtime in more detail. Designed specifically for mobile platforms and embedded devices, TensorFlow Lite delivers highly efficient performance and fast response times by minimizing computational overhead. Its flexibility allows deployment on smartphones and a wide range of IoT devices, making it highly portable. TensorFlow Lite is also energy-efficient. It supports hardware acceleration and is fully compatible with neural processing units (NPUs) through a mechanism called delegation.</p>
</section>

<section>
    <h1>Quantizing Models</h1>
    <p align="justify">Quantization reduces the precision of your model to speed up computation and decrease model size. This process can make models up to four times smaller and faster. The three main benefits of quantization are: reduced model size for better storage on devices with limited capacity, faster processing due to fewer computations, and lower power consumption, which is crucial for battery-operated devices.</p>
    <p align="justify">To understand quantization, consider a floating point tensor, which takes 32 bits per value. Quantization converts this to an integer representation with 8 bits per value, using a scale and zero point for accurate translation. The goal is to minimize the error introduced when converting from floating point to integer.</p>
    <p align="justify">There are two main types of quantization:</p>
    <ul>
        <li>Weight quantization, which reduces the precision of model weights to optimize storage.</li>
        <li>Activation quantization, which applies lower precision to activation values to accelerate inference using lower precision numerics.</li>
    </ul>
    <p align="justify">Different levels of quantization exist, such as:</p>
    <ul>
        <li>W8int8, converting both weights and activations to 8-bit.</li>
        <li>W8int16, converting weights to 8-bit and keeping activations at 16-bit.</li>
        <li>Extreme quantization like W4 (weights at 4-bit and activations at 16-bit) is popular for large language models and generative AI applications.</li>
    </ul>
    <p align="justify">Quantization methods include:</p>
    <ul>
        <li>Post-training quantization</li>
        <li>Quantization-aware training</li>
    </ul>
    <p align="justify">Post-training quantization applies the process after training, using calibration with sample data to minimize quantization error. This typically requires a few hundred samples.</p>
    <p align="justify">Quantization-aware training incorporates quantization into the training process itself, learning the model weights and their integer representation simultaneously. This can yield more accurate models when post-training quantization is insufficient.</p>
</section>

<section>
    <h1>Device Integration</h1>
    <p align="justify">The following outlines the steps for integrating an AI model into a smartphone application for real-time segmentation at 30 frames per second:</p>
    <ol align="justify">
        <li><strong>Understanding Data Transformation</strong>: The data flow begins with the camera stream, which provides frames in either RGB or YUV format. The GPU is used for pre-processing to convert YUV to RGB and downsample to the model's required resolution (e.g., from 720p to 224x224).</li>
        <li><strong>Device Integration Process</strong>: Integration involves several stages:
            <ul>
                <li>Camera Stream Extraction: Extract frames at 30 frames per second in either RGB or YUV format.</li>
                <li>Pre-processing: Utilize the GPU and OpenCV for efficient conversion and downsampling of the frames to match the model's resolution.</li>
                <li>Model Inference: Run the AI model on the device's Neural Processing Unit (NPU) using runtime APIs (C++ or Java-based) for optimal performance. The model outputs a mask of the same resolution as it was trained on (e.g., 224x224).</li>
                <li>Post-processing: Use the GPU and OpenCV again for tasks like upsampling, smoothing, thresholding, and blurring to overlay the output mask onto the camera stream.</li>
                <li>Packaging Runtime: Ensure all runtime dependencies, including the AI models, are packaged within the application to leverage hardware acceleration effectively.</li>
            </ul>
        </li>
        <li><strong>Implementation</strong>: There are five key parts:
            <ul>
                <li>Camera Stream Extraction: Capture frames from the camera.</li>
                <li>Pre-processing: Convert and downsample frames using the GPU.</li>
                <li>Model Inference: Perform inference on the NPU.</li>
                <li>Post-processing: Overlay the model's output on the camera stream using GPU-based techniques.</li>
                <li>Packaging: Include all necessary runtime dependencies in the application to ensure it runs efficiently on the device. This involves managing Java, native sources, and dependencies within an Android project.</li>
            </ul>
        </li>
    </ol>
</section>