import { gql } from "apollo-boost";

export const GET_SERVER_INSTANCES = gql`
  {
    serverInstances {
      id
      name
    }
  }
`;

export const INITIATE_DEPLOY = gql`
  mutation InitiateDeploy ($serverId: ID!, $revisionName: String!) {
    initiateDeploy(serverId: $serverId, revisionName: $revisionName) {
      status
    }
  }
`;
