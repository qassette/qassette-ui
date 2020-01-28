<script>
  import ApolloClient from 'apollo-boost';
  import { setClient } from 'svelte-apollo';
  import Form from './Form/Form.svelte'
  import Log from './Log/Log.svelte'

  const client = new ApolloClient({
    uri: `${process.env.APP_URL}/graphql`,
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    }
  });

  let logEntries = [];
  setClient(client);

  function handleMessage(event) {
    logEntries = [...logEntries, event.detail.text];
  }
</script>

<svelte:head>
  <link rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</svelte:head>

<div class="container-fluid">
  <Form on:submit={handleMessage} />
  <Log logEntries={logEntries} />
</div>
