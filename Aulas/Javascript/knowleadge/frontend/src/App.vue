<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
		<!-- Os 2 pontos interpola o valor, necessario para nao ser confundido com String -->
		<Header title="Cod3r - Base de Conhecimento" 
			:hideToggle="!user"
			:hideUserDropdown="!user" />
		<Menu v-if="user" />
		<Loading v-if="validatingToken" />
		<Content v-else />
		<Footer />
	</div>
</template>

<script>
import axios from "axios"
import { baseApiUrl, userKey } from "@/global"
//o @ significa que voce vai acessar de forma absoluta o path.
import { mapState } from "vuex"
import Header from "@/components/template/Header"
import Menu from "@/components/template/Menu"
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
import Loading from "@/components/template/Loading"

export default {
	name: "App",
	components: { Header, Menu, Content, Footer, Loading },
	computed: mapState(['isMenuVisible', 'user']),
	data: function() {
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if (res.data) {
				//Commit executa o metodo setUser e salva na localstorage.
				this.$store.commit('setUser', userData)
				//Essa eh a verificacao de responsividade, o $mq eh
				//um atributo que foi criado no "mq.js" quando registrado
				//usando o metodo use do Vue.js. Ou seja de acordo com
				//o breakpoint esse atributo tem como possivel valor,
				//as strings: xs,sm,md,lg,xl de acordo com o tamanho
				//informado nos breakpoints. Se for xs ou sm, oculta 
				//o menu lateral.
				if(this.$mq === 'xs' || this.$mq === 'sm') {
					this.$store.commit('toggleMenu', false)
				}
			} else {
				//remove da storage o valor de userKey.
				localStorage.removeItem(userKey)
				//Redireciona a tela de login, que nesse caso tem o nome de rota de Auth
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	}
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer";
	}

	#app.hide-menu {
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}
</style>