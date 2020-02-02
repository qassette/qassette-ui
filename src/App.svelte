<script>
  import ApolloClient from 'apollo-boost';
  import { setClient } from 'svelte-apollo';
  import Form from './Form/Form.svelte'
  import Log from './Log/Log.svelte'
  import initWsClient from './wsclient'

  const client = new ApolloClient({
    uri: `${process.env.APP_URL}/graphql`,
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    }
  });

  const onMessage = (evt) => {
    const data = JSON.parse(evt.data);
    if (data.type !== "ping" && data.message) {
      appendToLog(data.message);
    }
  }
  initWsClient(onMessage);

  let logEntries = [];
  setClient(client);

  function appendToLog(text) {
    const currentdate = new Date();
    const datetime = `${currentdate.getDate()}.${(currentdate.getMonth()+1)}.` +
      `${currentdate.getFullYear()}@` +
      `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

    logEntries = [...logEntries, `${datetime} --- ${text}`];
  }

  function handleMessage(event) {
    appendToLog(event.detail.text);
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
