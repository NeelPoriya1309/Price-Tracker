import client from 'Client';

let FeedbackProbability = 0.4;

function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const titles = [
  'Good Product',
  'Bad Product',
  'Average Product',
  'Nice Product',
  'One of the Best online search products',
];

const type = ['Positive', 'Negative', 'Neutral'];

const description = [
  'We have been using product for last one year, and I have to say that it has transformed the way we do business. Thank you for awesome service.',
  't has changed the way I used the website. Product lets you create anything you envision and it does it so easy and flawless. I cant imagine not working with the service.',
  'nsights from service drove 30% lift in our conversions, this product service is essential for your company growth strategy.',
  'The company really helped with my personal branding - everything from conception to execution was amazing and super professional. Looking forwards for upgradation.',
  'Best company I have ever deal with online! Quick delivery and excellent customer service. Will definetly upgrade the service.',
  'These folks are my go-to for any design or branding services. Excellent communication and I feel like I am always a priority for them.',
  'Love your stuff, the quality has been incredible year after year. I tell everyone I know that they have to try the product. Thank you to the team the whole team.',
  'Product bring 10x multiplier in terms of both ease and spread of use. Im able to quickly and easily execute on my marketing strategies. That the fundamental difference from other services.',
  'Team offers a powerful suite of tools that every client must have. And if you get stuck their support team will help out. Its is fast, reliable and has no complications at all.',
  'The vibe, level of inquiry, feedback and traffic at our product services and newly designed booth at a recent conference was very positive.',
];

export default async function handler(req, res) {
  const userDataRequest = await fetch('http://localhost:3000/api/user');

  const userData = await userDataRequest.json();

  const userIDs = userData.body.map((user) => user.id);

  let counter = 0;
  userIDs.forEach(async (id) => {
    if (Math.random() < FeedbackProbability) {
      const numberOfFeedback = Math.floor(Math.random() * 10);
      for (let i = 0; i < numberOfFeedback; i++) {
        counter++;
        const feedback = {
          user_id: id,
          title: titles[Math.floor(Math.random() * titles.length)],
          description:
            description[Math.floor(Math.random() * description.length)],
          type: type[Math.floor(Math.random() * type.length)],
        };
        const createFavouriteRequest = await fetch(
          'http://localhost:3000/api/feedback',
          {
            method: 'POST',
            body: JSON.stringify(feedback),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        await createFavouriteRequest.json();
      }
    }
  });

  res.status(200).json({ message: `ok! Inserted ${counter} feedback.` });
}
