import "./Blog.css";

const posts = [
  {
    id: 1,
    title: "Neon Nights Festival Returns for 2024",
    date: "October 3, 2024",
    description:
      "Neon Nights is back at Desert Valley Arena this October, bringing three days of live music, immersive light shows, and food vendors from across the region. Early bird tickets sell out fast, so promoters listing similar events should plan their launch at least six weeks ahead.",
    image: "https://picsum.photos/seed/neonnights/600/400",
  },
  {
    id: 2,
    title: "How Promoters Are Using Data to Sell Out Shows",
    date: "September 18, 2024",
    description:
      "More promoters on TicketYetu are turning to real-time sales data to time their marketing pushes. From adjusting ticket tiers mid-campaign to spotting which channels drive the most conversions, here's how top organisers are staying ahead of demand.",
    image: "https://picsum.photos/seed/promoterdata/600/400",
  },
  {
    id: 3,
    title: "Behind the Scenes: Setting Up a Festival Stage",
    date: "August 29, 2024",
    description:
      "Ever wondered what it takes to build a festival main stage in under 48 hours? We spoke to the production crew behind last month's sold-out event to break down the logistics, permits, and last-minute problem solving that goes into every show.",
    image: "https://picsum.photos/seed/stagesetup/600/400",
  },
];

function Blog() {
  return (
    <section className="blog">
      <h1 className="blog-title">TicketYetu Blog</h1>
      <p className="blog-subtitle">
        News, tips, and stories from the world of live events.
      </p>

      <div className="blog-list">
        {posts.map((post) => (
          <article className="blog-post" key={post.id}>
            <div className="blog-post-text">
              <p className="blog-post-date">{post.date}</p>
              <h2 className="blog-post-title">{post.title}</h2>
              <p className="blog-post-description">{post.description}</p>
              <a className="blog-post-link" href="#">
                Read more →
              </a>
            </div>

            <div className="blog-post-image-wrapper">
              <img
                className="blog-post-image"
                src={post.image}
                alt={post.title}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Blog;
