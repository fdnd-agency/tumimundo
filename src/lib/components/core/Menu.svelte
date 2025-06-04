<script>
    import { Home, Test, Lessons, Statistics, Profile } from '$lib/index';
    export let currentPage;
</script>

<header>
    <nav>
        <ul>
            <li class:active={currentPage === 'home'}>
                <a href="/">
                    <Home/>
                    <p>Home</p>
                </a>
            </li>
            <li>
                <a href="https://tumimundo.vercel.app/">
                    <Test/>                    
                    <p>Testing</p>
                </a>
            </li>
            <li class:active={currentPage === 'lessons'}>
                <a href="/lessons">
                    <Lessons/>                       
                    <p>Lessons</p>
                </a>
            </li>
            <li class:active={currentPage === 'statistics'}>
                <a href="/statistics">     
                    <Statistics/>                 
                    <p>Statistics</p>
                </a>
            </li>
            <li class:active={currentPage === 'profile'}>
                <a href="/profile">     
                    <Profile/>                
                    <p>Profile</p>
                </a>
            </li>
        </ul>
    </nav>
</header>

<style>
    
header {
    height: 5em;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    background-color: #292929;
    color: #fff;

    z-index: 1000;
    isolation: isolate;
}
nav, ul {
    height: 100%;
}
a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
}
ul {
    display: flex;
    justify-content: space-around;
    width: 100%
}
li, li a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.active a p {
    stroke: #599AE7;
    color: #599AE7;
}

.active a {
    border-bottom: 3px solid #599AE7;
}
/* Desktop sidebar */
@media screen and (min-width: 1025px) {
	header {
		position: fixed;
		top: 0;
		left: 0;
		transform: none;
		width: 300px;
		height: 100%;
		padding-top: 2rem;
	}

	ul {
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
        align-items: center;
		height: 100%;
		gap: rem;
		padding-left: 1rem;
	}

	li, li a {
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		gap: 0.5rem;
        font-size: 1.5rem;
	}

	.active a {
		border-bottom: none;
		border-left: 3px solid #599AE7;
		padding-left: 0.5rem;
	}
}

</style>

