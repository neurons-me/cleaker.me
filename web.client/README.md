**Cleaker** is a noun located in space and time:
Definiciones de [Oxford Languages](https://languages.oup.com/google-dictionary-en)
*noun*
**GRAMMAR**
noun: **noun**; plural noun: **nouns**

1. > a word (other than a pronoun) **used to identify any of a class of people, places, or things (common noun)**, or to name a particular one of these (proper noun).
   > "converting adjectives to nouns has always been common in English"
---------
Understanding that **Cleaker** serves **as a** **unique digital asset identifier,** with a range of functionalities including context awareness, flexibility, and data signing, we integrated these features into the modular server design with **subdomain handling and profile routing**. 

**Cleaker.me** acts as a **channel** for these functionalities over the network, specifically through :

https://cleaker.me and its user-specific subdomains like **username.cleaker.me**

# Subdomains
Subdomains are a way to create a **unique URL** for each user. This is done by creating a wildcard DNS record that points all subdomains to the same server. The server then parses the subdomain and uses it to identify the user. This is done by using the request object in the server, to get the subdomain and then using it to query the database for the user. If the user exists, the server will then route the request to the user's profile page. If the user does not exist, the server will route the request to the homepage.

### Technical Data

useAuth serves as a central access point for session data, making it easy for any component within the context tree to fetch and use the session information. When you call useAuth in any component, it connects to the AuthContext.Provider set up in main.jsx, giving you access to shared session data (user, isLoggedIn, loading, etc.) without needing to pass these values down as props.

This approach is efficient for maintaining session state across the entire app and ensures that changes to session data (like logging in or logging out) are immediately reflected wherever useAuth is used. So, any component that needs session information or authentication state can just use useAuth, making your app more modular and manageable.

-------

[neurons.me](https://neurons.me)