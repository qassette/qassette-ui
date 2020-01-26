<script>
  import { getClient, query, mutate } from 'svelte-apollo';
  import { GET_SERVER_INSTANCES, INITIATE_DEPLOY } from '../queries';
  import './style.scss'

  const client = getClient();

  const serverList = query(
    client, { query: GET_SERVER_INSTANCES }
  );

  let formData = {
    serverId: null,
    revisionName: null
  }

  async function handleSubmit() {
    const resp = await mutate(
      client,
      {
        mutation: INITIATE_DEPLOY,
        variables: {
          serverId: formData.serverId,
          revisionName: formData.revisionName
        }
      }
    );
    console.log(resp);
  }

  $:formIsReady = formData.serverId && formData.revisionName;
</script>

<div class="container-fluid">
  <form class="main-form" on:submit|preventDefault="{handleSubmit}">
    <div class="row justify-content-center align-items-center">
      {#await $serverList}
      <p>.. loading</p>
      {:then data}
        <select bind:value={formData.serverId} class="main-form__input">
          <option value="">Select a server</option>
          {#each data.data['serverInstances'] as instance, i}
            <option value="{instance.id}">{instance.name}</option>
          {/each}
        </select>
      {:catch e}
        {e}
      {/await}
    </div>

    <div class="row justify-content-center align-items-center mt-3">
      <input
        bind:value={formData.revisionName}
        class="main-form__input text-center"
        placeholder="Enter a branch name"
        type="text"
        name="revision_name"
        id="revision_name"
      >
    </div>

    <div class="row justify-content-center align-items-center mt-3">
      <button disabled="{!formIsReady}" class="main-form__input" method="submit">
        Initiate deployment
      </button>
    </div>
  </form>
</div>
