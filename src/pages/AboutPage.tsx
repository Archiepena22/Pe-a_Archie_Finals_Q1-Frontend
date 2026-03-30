export const AboutPage = () => {
  return (
    <section className="about-page">
      <h1>About Finals Todo</h1>
      <p>
        This app demonstrates routing, context-driven API synchronization, and
        immutable state updates for a full CRUD workflow.
      </p>
      <ul className="about-list">
        <li>React Router with list and about routes.</li>
        <li>TodoContext providing CRUD actions via the backend API.</li>
        <li>Reusable UI components and a shared theme.</li>
      </ul>
    </section>
  )
}
