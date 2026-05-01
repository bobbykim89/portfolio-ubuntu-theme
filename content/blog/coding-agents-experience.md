---
title: 'What I Actually Learned Using Coding Agents'
description: 'Honest impressions from using AI coding agents in real projects: the token tradeoffs, the nonsense test suites, and why your engineering instincts matter more than ever.'
category: 'Engineering'
image: '/content_img/blog/coding_banner.webp'
githubUrl: 'https://github.com/bobbykim89'
linkedinUrl: 'https://www.linkedin.com/in/bobbykim89/'
emailAddress: 'bobby.sihun.kim@gmail.com'
date: 2026-04-30
---

::hero{:image-src="image" :rounded="true" :gradient="true" alt="coding banner image"}

# What I Actually Learned Using Coding Agents

::

::abstract

Coding agents are genuinely impressive. They can scaffold a project, write boilerplate, generate test suites, and talk through architectural tradeoffs with you. But after spending a good amount of time working with them on real projects, I have some honest impressions that go beyond the hype.

<br/>

This is not a "AI will replace developers" post, and it is not a "AI is useless" post either. It is just what I actually noticed.

::

## Think of Yourself as a Builder

<br/>

The most important mental shift I made was stopping thinking of AI as a tool and starting to think of it more like a worker I am managing.

<br/>

That means having a clear picture of what I am trying to build before I start prompting. It means thinking about the overall structure of the project, not just the next task. And it means understanding that the quality of what comes out is directly tied to how clearly I can communicate what I want.

<br/>

When I started out, I would just tell the agent to "do this for me" without a clear picture of what "this" even looked like. Looking back, I was not really sure what I wanted either, and it showed in the output. The agent would produce something that technically did something, but it was not what I needed. Then I would spend more tokens trying to fix it incrementally, which is about the least efficient way to use an agent.

<br/>

The builder mentality is about having that bird's eye view of the project before you delegate anything. You are the architect. The agent is doing the work, but you are responsible for knowing where it should go.

<br/>

## The Precision vs. Token Tradeoff Is Real

<br/>

Here is something I do not see talked about enough: being more specific costs more tokens upfront, but being vague costs more tokens overall.

<br/>

On a personal project I am currently working on, I often hit my daily token limit just from the discussion phase. I am going through each important decision, defining the project structure, specifying types and function signatures, and nailing down what the outcome should actually look like before any code gets written. That burns through a lot of tokens.

<br/>

But the alternative, which I learned the hard way early on, is letting the agent make too many autonomous decisions. The output looks plausible, you think it is roughly right, and then you realize it is subtly off in ways that compound as you build on top of it. Fixing that incrementally ends up costing far more tokens than the upfront discussion would have.

<br/>

The way I think about it now: spending tokens on definition and alignment is an investment. Spending tokens on fixing misaligned output is just waste.

<br/>

## AI Will Write Your Tests. Whether They Are Good Tests Is Up to You.

<br/>

Writing test scripts is one of the most tedious parts of development, and agents are genuinely fast at it. But fast and good are not the same thing.

<br/>

Early on I asked an agent to write a test suite without giving it any real testing criteria. One of the lines it produced was literally `assert True`. Just. `assert True`. A test that passes no matter what, every single time, forever. Completely useless.

<br/>

Once I went back and actually defined what I wanted to verify, what the expected inputs and outputs were, what edge cases mattered, the test suite it produced was actually solid. The agent did not need me to write the tests. It needed me to know what good tests looked like and communicate that clearly.

<br/>

This is a pattern that shows up everywhere with agents. The output is only as good as your understanding of what good output looks like.

<br/>

## AI as a Thinking Partner

<br/>

One thing agents are genuinely great at, and that I think gets undersold, is being a sounding board.

<br/>

When I am making an architectural decision, weighing two approaches, or trying to figure out what the right pattern is for a given situation, talking it through with an agent is surprisingly useful. It can lay out the tradeoffs, push back on assumptions, and point toward established best practices. It is like having a knowledgeable colleague available at any hour who has no ego about the discussion.

<br/>

I use it this way a lot now, not just for "write me this code" but for "here is what I am thinking, what am I missing?" That kind of back and forth has genuinely shaped some of my project decisions for the better.

<br/>

## Your Domain Knowledge Is Not Optional

<br/>

This is the one I feel most strongly about.

<br/>

I have seen non-developers share vibe-coded POCs that looked genuinely impressive at first glance. Nice UI, smooth interactions, seemed to work. But when you looked closer, things fell apart fast. Hardcoded datasets instead of real API connections. Claimed to be "75% production ready" while having the actual API keys sitting exposed in the frontend code. Outputs that looked plausible but were not close to correct.

<br/>

These are not subtle mistakes. They are the kind of things that any working engineer would catch immediately, because we know what production code actually needs to look like. We know about environment variables, about authentication, about data validation, about what "production ready" actually means.

<br/>

The agent did not make those mistakes out of malice. It made them because nobody with the right knowledge was reviewing the output critically.

<br/>

This is why I think the "anyone can build anything with AI now" framing is a bit misleading for anything beyond a toy project. As scope grows, as the system gets more complex, as the output starts to matter, your engineering intuition becomes more important, not less. You need to understand the structure the agent is building, evaluate whether the decisions it made are actually sound, and catch the things it got wrong before they become real problems.

<br/>

AI is doing more of the typing. But the judgment still has to come from somewhere.

<br/>

## Where I Land on This

<br/>

Coding agents have genuinely changed how I work. The tedious parts move faster. The thinking parts are more collaborative. And for well-scoped tasks with clear requirements, the output is often really good.

<br/>

But they work best when you bring something to the table too. A clear vision of what you are building. An understanding of what good output looks like. And enough domain knowledge to know when something that looks right is actually wrong.

<br/>

The engineers who get the most out of these tools are not the ones who hand everything off. They are the ones who know exactly what to hand off, and what to keep a close eye on.

::contact-buttons{:github-url="githubUrl" :linkedinUrl="linkedinUrl" :email-address="emailAddress"}

::
