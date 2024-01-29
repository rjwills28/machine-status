#!/bin/bash
# Script to be called by .gitlab-ci.yml to perform container build
# using gitlab kubernetes executor

echo 'Building ${APP_VERSION} image...'
GROUP=controls
TEMPLATE_CMD="/kaniko/executor --context ${CI_PROJECT_DIR}"
DESTINATION="${CI_REGISTRY}/${GROUP}/machine_status_${APP_VERSION}"
DOCKERFILE="${CI_PROJECT_DIR}/Dockerfile"

# Tag: push tagged image and latest
if [[ -n "${CI_COMMIT_TAG}" ]]; then
    CMD="${TEMPLATE_CMD} --dockerfile ${DOCKERFILE} --destination ${DESTINATION}:${CI_COMMIT_TAG} --destination ${DESTINATION}:latest"
# On integration branch: push image tagged integration
elif [[ "${CI_COMMIT_BRANCH}" == "integration" ]]; then
    CMD="${TEMPLATE_CMD} --dockerfile ${DOCKERFILE} --destination ${DESTINATION}:integration"
# No tag: build but don't push
else
    CMD="${TEMPLATE_CMD} --dockerfile ${DOCKERFILE} --no-push"
fi

echo "Command for machine-status image ..."
echo "$CMD"
$CMD || exit 1
