<script>
     import { Button } from '$lib/index';
</script>

<main>
    <section>
        <h1>Choose a buddy</h1>
        <p>During the learning journey your child will have a buddy that learns with them, gives reminders and shows the statistics! Here you can pick a buddy.</p>

        <p>Drag left or right, or use the buttons on the side to see all the buddies!</p> 

        <Button type="input" variant="primary" />
    </section>
    
</main>

<style>

main{
    background: var(--bg-image-blue);
    color: white;
    height: 100vh;
    width: 100vw;
}    
section{
    display: flex;
    flex-direction: column;
    align-items: center;
}
h1{
    margin: 2em 0 2em 0;
}
p{
    max-width: 30em;
    margin-bottom: 1em;
}
</style>